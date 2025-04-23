import React from 'react'
import { IoLogOut } from 'react-icons/io5'

export default function LogoutButton() {
  return (
    <div className="flex items-center ">
          <div
              onClick={() => {}}
              className="flex items-center justify-center w-13 h-13 rounded-full bg-gray-200 dark:bg-gray-800  focus:outline-none"
            >
              {<IoLogOut className="text-2xl dark:text-gray-200 text-gray-800" />}
          
          </div>
        </div>
  )
}
