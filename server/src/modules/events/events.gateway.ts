import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from "socket.io";
import { Logger } from '@nestjs/common'
import { Socket } from 'socket.io';
import { config } from 'src/config/config';
import { AuthService } from '../auth/auth.service';
import { ChatsService } from "../chats/chats.service";
import { GroupsService } from "../groups/groups.service";
import { findUser } from 'src/utils/utils.service';

type messageType = {
  id: string
  senderToken: string
  recipientId: string
  content: string
}

const CREATE_MESSAGE_EVENT = 'createMessage'
const NEW_MESSAGE_EVENT = 'newMessage'

@WebSocketGateway()
export class EventsGateway {
  private logger: Logger = new Logger('EventsGateway');
  private auth: AuthService = new AuthService();
  private chat: ChatsService = new ChatsService();
  private group: GroupsService = new GroupsService();

  afterInit() {
    this.logger.log('Initialized!');
  }

  @WebSocketServer()
  server: Server

  @SubscribeMessage('join')
  async handleJoin(socket: Socket, params: { accessToken: string }, callback) {
    const { accessToken } = params;

    if (!config.regex.uuidv4.test(accessToken)) return callback("Invalid token");
    const session = await this.auth.findSession(accessToken);
    if (!session) return callback("Token passed is not existent");
    let roomIds = await this.group.getGroupsIds(session.userId);
    roomIds.push(session.userId);
    roomIds.forEach(roomId => socket.join(roomId)); //join userId room and all of its groups
    callback();
  }

  @SubscribeMessage(CREATE_MESSAGE_EVENT)
  async handleCreateMessage(socket: Socket, message: messageType, callback) {
    console.log(CREATE_MESSAGE_EVENT, message);
    const session = await this.auth.findSession(message.senderToken);
    if (!session) return callback("Token passed is not existent");
    //if recipientId is not a userId, then it is a groupId
    const recipientUser = await findUser("id", message.recipientId);
    if (!recipientUser) {
      await this.group.sendMessage({
        id: message.id,
        groupId: message.recipientId,
        userId: session.userId,
        content: message.content
      });

      // send new message event to the rooms of the recipient and the sender
      socket.to(message.recipientId).emit(NEW_MESSAGE_EVENT, {
        id: message.id,
        senderId: session.userId,
        recipientId: message.recipientId,
        content: message.content,
        status: 'sent',
        createdAt: new Date()
      });
    }
    else {
      let chatId: string = await this.chat.getChatId(session.userId, message.recipientId);
      await this.chat.createChat(
        { userId: session.userId, recipientId: message.recipientId, chatId: message.id })
      await this.chat.sendMessage(
        { id: message.id, chatId, userId: session.userId, content: message.content });

      // send new message event to the rooms of the recipient and the sender
      socket.to(message.recipientId).to(session.userId).emit(NEW_MESSAGE_EVENT, {
        id: message.id,
        senderId: session.userId,
        recipientId: message.recipientId,
        content: message.content,
        status: 'sent',
        createdAt: new Date()
      });
    }

    callback();
  }

  @SubscribeMessage('disconnect')
  async handleDisconnect() {
    console.log('user disconnected')
  }
}
