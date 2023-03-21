import { SiEthereum } from 'react-icons/si'
import { GoInfo } from 'react-icons/go'
import { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'

const Welome = () => {
  const { connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction } = useContext(TransactionContext)

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    console.log(formData)
    e.preventDefault();
    if(!addressTo || !amount || !keyword || !message) return;
    sendTransaction();
  }

  return (
    <div className='lg:flex'>
      <div className='w-fit lg:ml-[20%] ml-[5%] mt-[5%] text-white'>
        <h1 className='text-white text-4xl'>Send Crypto<br /> across the world</h1>
        <p className='w-1/2 text-gray-400 mt-4'>Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.</p>
        { !currentAccount && <button
          type='submit'
          className='bg-blue-600 w-1/2 rounded-3xl p-2 mt-4'
          onClick={connectWallet}
        >
          Connect Wallet
        </button>}
        <div className='grid grid-cols-3 mt-14'>
          <div className='text-center border-2 p-3 rounded-tl-2xl'>
            Reliability
          </div>
          <div className='text-center border-2 p-3'>
            Security
          </div>
          <div className='text-center border-2 p-2 rounded-tr-2xl'>
            Ethereum
          </div>
          <div className='text-center border-2 p-3 rounded-bl-2xl'>
            Web 3.0
          </div >
          <div className='text-center border-2 p-3'>
            Low fees
          </div>
          <div className='text-center border-2 p-3 rounded-br-2xl'>
            Blockchain
          </div>
        </div>
      </div>
      <div className='lg:ml-40 lg:w-[25%] md:w-[50%] md:ml-44 w-[80%] ml-14'>
        <div className='bg-gradient-to-r from-blue-300 to-red-400 lg:w-[100%] p-4 lg:mt-24 rounded-xl'>
          <div className='flex space-x-72'>
            <SiEthereum className='justify-start' color='white' size={40} />
            <GoInfo size={20} className='text-gray-300' />
          </div>
          <div className='mt-16'>
            <h3 className='text-white text-xs'>Address</h3>
            <h2 className='text-white font-semibold'>Ethereum</h2>
          </div>
        </div>
        <div className=''>
          <form className='space-y-2 bg-gray-900 p-4'>
            <div>
              <input
                placeholder='Address To'
                className='bg-gray-800 p-2 w-[100%] text-white'
                name='addressTo'
                type='text'
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                placeholder='Amount(ETH)'
                className='bg-gray-800 p-2 w-[100%] text-white'
                name='amount'
                type='number'
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                placeholder='Keyword(Gif)'
                className='bg-gray-800 p-2 w-[100%] text-white'
                name='keyword'
                type='text'
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                placeholder='Enter Message'
                className='bg-gray-800 p-2 w-[100%] text-white'
                name='message'
                type='text'
                onChange={handleChange}
              />
            </div>
            <div className='border-[1px]' />
            <button
              type='submit'
              className='bg-blue-600 w-full rounded-3xl p-2 mt-4 text-white'
              onClick={handleSubmit}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Welome;
