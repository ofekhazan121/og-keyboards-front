
    //   res.items.forEach((item) => {
    //     console.log(item);
    //     let image = {
    //       url : "",
    //       name : item.name
    //     }
    //     const findImage = images.find((img) => img.name === image.name)

    //     if(!findImage && images.length <= res.items.length) {
    //       getDownloadURL(item).then((url) => {
    //         image.url = url
    //         updateImages((prev) => [...prev,image])
    //       })
    //     }
    //   })


    // images.forEach((image) => {
    //     getDownloadURL(image).then((res) => {
    //       setImageObject((prev) => ([...prev, {image.name ,res}]))
    //     })
    //   });