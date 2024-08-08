import  { useState } from 'react';
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"

const UserList = ({ users, onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getInitials = (name) => {
    if (!name) return 'U'; // Default initial if no name is provided
    const names = name.split(' ');
    return names.map((n) => n[0]).join('').toUpperCase();
  };

  const filteredUsers = users.filter((user) => {
    const name = user.displayName || user.email;
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className=" bg-white  ">
      <div className="mb-4">
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:none "
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ScrollArea className="h-[30rem] ">
        {filteredUsers.map((user) => (
         <>
         <div
            key={user.email}
            className="flex items-center  p-4 mb-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-transform transform hover:scale-105"
            onClick={() => onSelectUser(user)}
          >
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500">{getInitials(user.displayName)}</span>
            </div>
            
            <div className=" pl-4 ">
              <div className="text-lg font-semibold text-gray-900">
                {user.displayName || user.email}
              </div>
              <div className="text-sm text-gray-600">
                {user.email}
              </div>
            </div>
            
            
          </div>
          <Separator className="my-2"/>
          </>
        ))}
      </ScrollArea >
    </div>
  );
};

export default UserList;