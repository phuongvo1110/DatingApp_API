using DatingApp.DTOs;
using DatingApp.Helpers;
using DatingApp.Models;

namespace DatingApp.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message?> GetMessage(int id);
        Task<PageList<MessageDto>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string recipientUsername);
        void AddGroup(Group group);
        void RemoveConnection(Connection connection);
        Task<Connection?> GetConnection(string connectionId);
        Task<Group?> GetMessageGroup(string groupName);
        Task<Group?> GetGroupForConnection(string connectionId);
    }
}
