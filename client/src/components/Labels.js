import React from 'react'

const obj =[
    {
        type:"Saving",
        color:'#f9c73f',
        percent:45
    },
    {
        type:"Investment",
        color:'rgb(54, 162, 235)',
        percent:28
    },
    {
        type:"Expense",
        color:'#f9c73f',
        percent:54
    }
]

export default function Labels() {
  return (
    <>
        {obj.map((v,i) => <LableComponent key={i} data={v}></LableComponent>)}
    </>
  )
}

function LableComponent({data}){
    if(!data) return<></>
    return(
        <div className='labels flex justify-between'>
            <div className='flex gap-2'>
                <div className='w-2 h-2 rounded py-3' style={{background:data.color ?? '#f9c73f'}}></div>
                <h3 className='text-md'>{data.type ??''}</h3>
            </div>
            <h3 className='font-bold'>{data.percent ?? 0}%</h3>
        </div>
    )
}
