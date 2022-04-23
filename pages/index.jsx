import {useEffect, useState} from 'react';
import { useInView } from 'react-intersection-observer';
import {sdk, createAnonymousSession } from '../utils.js'


const Home = () => {
  const { ref: myRef, inView } = useInView();
  const [appBlogRead, setAppBlogRead] = useState(0)
  const [blogCount, setBlogCount] = useState()



  const handleBlogCount = async () => {
    try {
      let promise =  await sdk.database.listDocuments('625d90c3e8a7e178e3d0')
      setBlogCount(promise.documents[0].blogCount)
      
    } catch (error) {
      console.log(error)
    }
  }

  const updateBlogCount = async () => {
    try {
      await sdk.database.updateDocument('625d90c3e8a7e178e3d0', '625ea2d06ac56fce044f', {
        "blogCount": blogCount
      })
      handleBlogCount()
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    createAnonymousSession()
    handleBlogCount()
  }, [])

  useEffect(() => {
    if(inView){
      if (appBlogRead < 1) {
        setAppBlogRead(appBlogRead + 1)
        setBlogCount(blogCount + 1)
      }else{
        return
      }
      
    }
  }, [inView])

  useEffect(() => {
    updateBlogCount()
  }, [blogCount])






  return (
    <div className="blog">
      <div className="nav"></div>
      <div className="blog-container">
        <div className="writer">
          <div className="writer-image"></div>
          <div className="writer-name">Adut Elsesser</div>
        </div>
        <div className="blog-header">
          <h3>Blog reads: {blogCount}</h3>
          <h2>Mind on the road, your dilated eyes</h2>
          <p>Watch the clouds float, white Ferrari</p>
        </div>
        <div className="blog-image"></div>
        <div className="blog-story-container">
          <p>
            Had a good time
            (Sweet 16, how was I supposed to know anything?I let you out at CentralI didn't care to state the plainKept my mouth closedWe're both so familiarWhite Ferrari, good times
          </p>
          <p> 
            Stick by me, close by me You were fine You were fine here That's just a slow body You left when I forgot to speak So I text to speech, lesser speeds Texas speed, yes Basic takes its toll on me, Eventually, eventually, yes Ah, on me eventually, eventually, yes I care for you still and I will forever That was my part of the deal, honest We got so familiar Spending each day of the year, White Ferrari Good times In this life, life In this life, life
  
          </p>
          {/* The ref */}
          <p ref={myRef}> 
            One too many years Some tattooed eyelids on a facelift Mind over matter is magic I do magic If you think about it it'll be over in no time And that's life I'm sure we're taller in another dimension You say we're small and not worth the mention
          </p>
          <p>
            You're tired of movin', your body's achin' We could vacay, there's places to go Clearly this isn't all that there is Can't take what's been given But we're so okay here, we're doing fine Primal and naked You dream of walls that hold us imprisoned It's just a skull, least that's what they call it And we're free to roam
          </p>
        </div>
      </div>
    </div>  
  )
}

export default Home;