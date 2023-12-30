import React, { useState, useEffect } from 'react'

const Notification = ({children, notification}) => {
    const [showNotification, setShowNotification] = useState(false)

    useEffect(() => {
        let timeout;
        
        if (notification) {
          timeout = setTimeout(() => {
            setShowNotification(true);
          }, 100);
        } else {
          setShowNotification(false);
        }
        return () => clearTimeout(timeout);
      }, [notification]);
      
  return (
    <div className='conteiner_notification'>
        {children}
        <div className={showNotification ? 'spanOff' : 'span'}>
        </div>
    </div>
  )
}

export default Notification