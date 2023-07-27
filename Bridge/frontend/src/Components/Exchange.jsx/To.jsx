import React,{useState,useEffect} from 'react'
import { BsCoin } from "react-icons/bs"
import { MdKeyboardArrowDown } from "react-icons/md"
import {FaNetworkWired} from "react-icons/fa"
import SelectModel from '../../Model/SelectModel'
import SelectNetwork from '../../Model/SelectNetwork'
import { network } from '../../assert/network'
import "./index.css"
export default function From({selectedNetTo,selectedToken,setSelectedToken,tokenAmount}) {
    const [tokenModel,setShow]=useState(false)
    const[networkModel,setnetworkModel]=useState(false)
    function hideTokenModel(value,isButton){
        if(isButton){
            setShow(!tokenModel)
            return
        }
        setSelectedToken(value)
        setShow(!tokenModel)
    }
 
    return (
        <div className='py-5 h-36 border px-10 bg-white rounded-lg shadow ring-0' >
            <div >
                <p className='font-light text-gray-600'> Enter Token Amount</p>
            </div>
            <div className='flex'>
                <div ><input type='number'  disabled={true} value={tokenAmount} placeholder='0.0' className='focus:outline-none appearance-none border-b border-black import placesize: asas cursor-not-allowed'  style={{ width: "460px",height:"70px"}}  /></div>
                <div className='flex mx-3 bg-[#F2EDFF] px-2 py-2 h-20 w-60 justify-between border border-indigo-200 rounded-md items-center cursor-pointer' onClick={()=>{setShow(!tokenModel)}}>
                    <div className='flex  '> 
                        <div >
                           <img src={selectedToken?.tokeniconurl}/>
                        </div>
                        <div  className='ml-3'>
                            <p className='text-[#032FA1] font-bold '>{selectedToken?.tokenSymbol}</p>
                            <span className='font-extralight text-[#032FA1]'>{selectedToken?.tokenName}</span>
                        </div>
                    </div>
                    <div className=''>
                        <MdKeyboardArrowDown size={35}  className='px-2 py-2 bg-white rounded-full'/>
                    </div>
                </div>
                <div className='flex mx-3 bg-[#F2EDFF] px-2 py-2 h-20 w-60 justify-between border border-indigo-200 rounded-md items-center cursor-not-allowed ' >
                    <div className='flex  '> 
                        <div >
                        <img src={selectedNetTo?.networkiconUrl}/>
                        </div>
                        <div  className='ml-3'>
                            <p className='text-[#032FA1] font-bold '>{selectedNetTo?.networkName}</p>
                            <span   className='font-extralight text-[#032FA1]'>{selectedNetTo?.networkType}</span>
                        </div>
                    </div>
                    <div className=''>
                        {/* <MdKeyboardArrowDown size={35}  className='px-2 py-2 bg-white rounded-full'/> */}
                    </div>
                </div>
            </div>
            <SelectModel show={tokenModel} hide={hideTokenModel}/>
        </div>
    )
}
