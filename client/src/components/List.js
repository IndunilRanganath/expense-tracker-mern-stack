import React from 'react'
import "boxicons";

const obj =[
    {
        name:"Saving",
        color:'#f9c73f'
    },
    {
        name:"Investment",
        color:'rgb(54, 162, 235)'
    },
    {
        name:"Expense",
        color:'#f9c73f'
    }
]

export default function List() {
  return (
    <div className='flex flex-col py-6 gap-3'>
        <h1 className='py-4 font-bolt text-xl'>History</h1>
        {obj.map((v,i) => <Transaction key={i} category={v}></Transaction>)}
    </div>
  )
}
function Transaction({ category }){
    if(!category) return null;
    return(
        <div className='item flex justify-center bg-gray-50 py-2 rounded-r' style={{borderRight:`8px solid ${category.color ?? '#f9c73f'}`}}>
            <button className='px-3'><box-icon size="15px" color={category.color ?? '#f9c73f'} name="trash"></box-icon></button>
            <span className='block w-full'>{category.name ?? ''}</span>
        </div>
    )
 }