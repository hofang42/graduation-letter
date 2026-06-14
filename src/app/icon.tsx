import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

// Route segment config
export const runtime = 'nodejs'

// Image metadata
export const size = {
  width: 128,
  height: 128,
}
export const contentType = 'image/png'

export default function Icon() {
  // Read the local image file
  const imagePath = path.join(process.cwd(), 'public/assets/logo.png')
  const imageData = fs.readFileSync(imagePath)
  
  // Convert to base64 so Satori can render it
  const base64Image = `data:image/png;base64,${imageData.toString('base64')}`

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          <img
            src={base64Image}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
