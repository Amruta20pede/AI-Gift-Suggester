import React from 'react';

import download  from '../Assests/download.png';
import downloadImage  from '../utils';

const card = ({ _id, name, prompt, photo }) => (
  <div
    style={{
      borderRadius: '0.75rem',
      position: 'relative',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    }}
    className="rounded-xl group relative shadow-card hover:shadow-cardhover card"
  >
    <img
      style={{
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        borderRadius: '0.75rem',
      }}
      src={photo}
      alt={prompt}
    />
    <div
      style={{
        display: 'none',
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: '#10131f',
        margin: '0.5rem',
        padding: '1rem',
        borderRadius: '0.375rem',
      }}
      className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md"
    >
      <p
        style={{
          color: 'white',
          fontSize: '0.875rem',
          overflowY: 'auto',
        }}
        className="text-white text-sm overflow-y-auto prompt"
      >
        {prompt}
      </p>

      <div
        style={{
          marginTop: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.25rem',
        }}
        className="mt-5 flex justify-between items-center gap-2"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.125rem',
          }}
          className="flex items-center gap-2"
        >
          <div
            style={{
              width: '1.75rem',
              height: '1.75rem',
              borderRadius: '50%',
              objectFit: 'cover',
              backgroundColor: 'green',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 'bold',
            }}
            className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold"
          >
            {name[0]}
          </div>
          <p
            style={{
              color: 'white',
              fontSize: '0.875rem',
            }}
            className="text-white text-sm"
          >
            {name}
          </p>
        </div>
        <button
          type="button"
          onClick={() => downloadImage(_id, photo)}
          style={{
            outline: 'none',
            backgroundColor: 'transparent',
            border: 'none',
          }}
          className="outline-none bg-transparent border-none"
        >
          <img
            style={{
              width: '1rem',
              height: '1rem',
              objectFit: 'contain',
              filter: 'invert(100%)',
            }}
            src={download}
            alt="download"
            className="w-6 h-6 object-contain invert"
          />
        </button>
      </div>
    </div>
  </div>
);

export default card;
