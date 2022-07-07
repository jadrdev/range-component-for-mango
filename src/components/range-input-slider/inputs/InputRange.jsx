import React from 'react'

const InputRange = (props) => {
  const { max, min, readOnly } = props;
  return (
    <>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 my-8">
          <input 
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              type="number" 
              placeholder={min}
              readOnly={readOnly ? readOnly : ''}
          />

        </div>
        <div className="w-full md:w-1/2 px-3 my-8">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            type="number"
            placeholder={max}
            readOnly={readOnly ? readOnly : ''}
          />
        </div>
      </div>
    </>
  )
}

export default InputRange