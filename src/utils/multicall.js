// import { AbiItem } from 'web3-utils'
import { Interface } from '@ethersproject/abi'
import { getWeb3 } from './web3helper'
import MultiCallAbi from '../constants/abis/Multicall.json'
import {MULTICALL_ADDRESS} from '../constants/constants'

const multicall = async (abi, calls) => {
  const web3 = getWeb3()
  const multi = new web3.eth.Contract((MultiCallAbi), MULTICALL_ADDRESS)
  const itf = new Interface(abi)

  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const { returnData } = await multi.methods.aggregate(calldata).call()
  const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))

  return res
}

export default multicall
