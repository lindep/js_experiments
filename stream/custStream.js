/*
* Just testing some custom stream data
*/

const numStream = {
  each: (callback) => {
    setTimeout(()=>callback(1),1000)
    setTimeout(()=>callback(2),2000)
    setTimeout(()=>callback(3),3000)
  }
}

numStream.each(console.log)
