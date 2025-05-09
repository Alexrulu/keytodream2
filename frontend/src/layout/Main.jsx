import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Carousel from '../components/Carousel.jsx'


const futureProperties = [
  {adress:'Solis al 1900'      ,img:'/future-propertie3.jpg' ,city:'San Fernando, Buenos Aires',price:180000},
  {adress:'Acqua del Rio 100'  ,img:'/future-propertie2.jpg' ,city:'San Miguel, Buenos Aires'  ,price:12000 },
  {adress:'Paseo Victorica 201',img:'/future-propertie1.webp',city:'Palermo, Buenos Aires'     ,price:150000},
]

const Main = () => {

  const [properties, setProperties] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetch('http://localhost:5000/api/properties')
      .then(response => response.json())
      .then(data => setProperties(data))
      .catch(error => console.error('Error al cargar las propiedades:', error));
  }, [])
  const currentProperty = properties.slice(0,4)[currentIndex] || {};

  const [currentIndexFuture, setCurrentIndexFuture] = useState(0)
  const currentFuture = futureProperties[currentIndexFuture] || {}

  return (
    <>
    <div className='overflow-hidden'>

      {/* mobile carousels */}
      <motion.div className='text-center w-4/5 mx-auto mb-20 lg:hidden'
                    initial={{x:100,opacity:0 }}
                whileInView={{x:0  ,opacity:1 }}
                   viewport={{amount:0.5      }}
                 transition={{duration: 1     }}>
        <div>
          <p className='text-3xl font-bold leading-tight'>Nuestras recomendaciones</p>
          <p className="text-base text-zinc-700 mt-4">Lo mejor del mercado, elegido para ti.</p>
        </div>
        <div className='flex justify-center mt-6'>
          <Carousel imgs={properties.slice(0,4).map(property => `http://localhost:5000${property.principalImage}`)} onSlideChange={setCurrentIndex}/>
        </div>
        <motion.div key={ currentIndex }
                initial={{opacity:0   }}
                animate={{opacity:1   }}
             transition={{duration:1}}>
          <p className='text-xl mt-4 font-semibold'>{currentProperty.adress}</p>
          <p className='text-lg text-gray-600'>{currentProperty.city}</p>
          <p className='text-xl mt-2 font-semibold'>${currentProperty.price}</p>
        </motion.div>
        <button className='bg-black text-white py-2 px-4  shadow-xl mt-4'>
            Ver propiedad
        </button>
      </motion.div>

      <motion.div className='text-center w-4/5 mx-auto lg:hidden'
                    initial={{x:100,opacity:0 }}
                whileInView={{x:0  ,opacity:1 }}
                   viewport={{amount:0.5      }}
                 transition={{duration: 1     }}>
        <div>
          <p className='text-3xl font-bold leading-tight'>Futuras propiedades</p>
          <p className="text-base text-zinc-700 mt-4">Propiedades en desarrollo, listas para ti muy pronto.</p>
        </div>
        <div className='flex justify-center mt-6'>
          <Carousel imgs={futureProperties.map(property => property.img)} onSlideChange={setCurrentIndexFuture} />
        </div>
        <motion.div key={currentIndexFuture}
                initial={{opacity:0 }}
                animate={{opacity:1 }}
             transition={{duration:1}}>
          <p className='text-xl mt-4 font-semibold'>{currentFuture.adress}</p>
          <p className='text-lg text-gray-600'>{currentFuture.city}</p>
          <p className='text-xl mt-2 font-semibold'>Desde ${currentFuture.price}</p>
        </motion.div>
        <button className='bg-black text-white py-2 px-4  shadow-xl mt-4'>
            Ver detalles del proyecto
          </button>
      </motion.div>

      {/* desktop carousels */}
      <motion.div className='hidden lg:flex h-[100vh] p-20 justify-between'>
        <motion.div className='flex flex-col justify-center gap-6 font-bold h-[60vh] w-[35vw]'
                      initial={{x:-100,opacity:0}}
                  whileInView={{x:0   ,opacity:1}}
                     viewport={{amount:0.5}}
                 transition={{duration:3, type:"spring"}}>
          <p className='leading-tight lg:text-4xl xl:text-5xl'>Nuestras recomendaciones</p>
          <p className="text-lg text-zinc-700">Lo mejor del mercado, elegido para ti.</p>
          <AnimatePresence mode='wait'>
            <motion.div className='flex flex-col gap-6'
                              key={ currentIndex }
                          initial={{opacity:0   }}
                          animate={{opacity:1   }}
                             exit={{opacity:0   }}
                       transition={{duration:0.5}}>
              <p className='text-2xl'>{currentProperty.adress}</p>
              <p className='text-xl'>{currentProperty.city}</p>
              <p className='text-2xl'>${currentProperty.price}</p>
            </motion.div>
          </AnimatePresence>
          <button className='bg-black text-white py-1 px-2  w-1/2 shadow-xl'>Ver propiedad</button>
        </motion.div>
        {properties.length > 0 &&(
          <Carousel imgs={properties.slice(0,4).map(property => `http://localhost:5000${property.principalImage}`)} 
                idPrefix={"recomended"} className='w-[50vw] h-[60vh]' onSlideChange={setCurrentIndex}/>
        )}
      </motion.div>

      <motion.div className='hidden lg:flex h-[85vh] p-20 justify-between'>
        <motion.div className='flex flex-col justify-center gap-6 font-bold h-[60vh] w-[35vw]'
                      initial={{x:-100,opacity:0}}
                  whileInView={{x:0   ,opacity:1}}
                     viewport={{amount:0.5}}
                   transition={{duration:3, type:"spring"}}>
          <p className='leading-tight lg:text-4xl xl:text-5xl'>Futuras propiedades</p>
          <p className="text-lg w-2/3 xl:w-full text-zinc-700">Propiedades en desarrollo, listas para ti muy pronto.</p>
          <AnimatePresence mode='wait'>
            <motion.div className='flex flex-col gap-6'
                              key={currentIndexFuture}
                          initial={{opacity:0   }}
                          animate={{opacity:1   }}
                             exit={{opacity:0   }}
                       transition={{duration:0.5}}>
              <p className='text-2xl'>{currentFuture.adress}</p>
              <p className='text-xl'>{currentFuture.city}</p>
              <p className='text-2xl'>Desde ${currentFuture.price}</p>
            </motion.div>
          </AnimatePresence>
          <button className='bg-black text-white py-1 px-2  w-1/2 shadow-xl'>Ver detalles</button>
        </motion.div>
        <Carousel imgs={futureProperties.map(property => property.img)} idPrefix={"future"} 
             className='w-[50vw] h-[60vh]' onSlideChange={setCurrentIndexFuture}/>
      </motion.div>


    </div>
      
    </>
  )
}

export default Main