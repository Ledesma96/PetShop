import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL+ 'api/messages');
      try {
        if (response.data.success) {
          setMessages(response.data.messages);
        } else {
          console.log('Error getting data');
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <table className='table_messages'>
      <thead className='table_messages_thead'>
        <tr className='table_messages_thead_tr'>
          <th className='table_messages_thead_tr_th'>NOMBRE</th>
          <th className='table_messages_thead_tr_th'>TELEFONO</th>
          <th className='table_messages_thead_tr_th'>EMAIL</th>
          <th className='table_messages_thead_tr_th'>FECHA</th>
        </tr>
      </thead>
      <tbody className='table_messages_tbody'>
        {messages.map((message) => {
          const formattedDate = new Intl.DateTimeFormat('es-AR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timeZone: 'America/Argentina/Buenos_Aires',
          }).format(new Date(message.date));
          return (
            
              <tr className='table_messages_tbody_tr'>
                <td className='table_messages_tbody_tr_td'>{message.name}</td>
                <td className='table_messages_tbody_tr_td'>{message.telephone}</td>
                <td className='table_messages_tbody_tr_td'>{message.email}</td>
                <td className='table_messages_tbody_tr_td'>
                  <Link className='table_messages_tbody_link' key={message._id} to={`/dashboard/messages/details/${message._id}`}>{formattedDate}
                  </Link>
                </td>
              </tr>
            
          );
        })}
      </tbody>
    </table>
  );
};

export default Messages;
