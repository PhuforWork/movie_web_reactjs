import React from 'react'
import "./loading.scss"
import { LoadingOutlined } from '@ant-design/icons'

export default function Loading() {
  return (
    <div className='style-loading'>
        <div className='text-2xl'><LoadingOutlined className='loading-icons'/></div>
    </div>
  )
}
