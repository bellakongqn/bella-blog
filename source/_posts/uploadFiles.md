---
title: 图片上传本地预览 & formData多文件上传
date: 2020-04-15 14:37:21
tags:
    - upload
categories: upload
thumbnail: '../assets/uploadImg&previewLocal.png'
---
React 封装图片上传组件 (hooks + ts)
1. React.forwardRef 是为了解决在上传同一张图片的时候 target.value未改变 不触发 onChange 事件
2. [React.forwardRef](https://reactjs.org/docs/forwarding-refs.html)
3. [FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects)
3. [项目地址](https://github.com/bellakongqn/studyProgress/tree/master/ts-app)
<!-- more -->
```
    import React, { InputHTMLAttributes } from 'react'

    type InputFileProps = InputHTMLAttributes<HTMLInputElement>

    export const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>((props, ref) =>{
        return(
            <div className="upload__file">
                <div className="upload__label">
                    <img src={require("../img/add-icon.png")} alt="add-icon"/>
                </div>
                <input ref={ref} type="file" accept="image/*" multiple {...props} className="upload__input"/>
            </div>
        )
    })
```

调用InputFile
```
import React, { useState, useCallback, ChangeEvent, useRef } from 'react'
import { InputFile } from '../../components/InputFile'
// import { uploadImage } from '../../services/upload' // 上传api

type ImageProps =  {
    thumb:string,  // 本地预览图的类型
}

export const UploadPage = () =>{

    const [files, setFiles] = useState<ImageProps[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault()
        const filesCurr = e.target.files
        if (filesCurr !== null) {
            // 本地预览
            const newList: ImageProps[] = []
            for (let i = 0; i < filesCurr.length; i++) {
                newList.push({
                    thumb: URL.createObjectURL(filesCurr[i])
                    // 预览图url
                })
            }
            setFiles([...files, ...newList])

            // 调用接口
            // uploadImage(filesCurr)
            //     .then(res => {
            //         console.log(res)
            //  解决 调用同一张图 不触发onChange， 每次上传结束之后 将value置空
            //         if (inputRef.current) {
            //             inputRef.current.value = ''
            //         }
            // 拼接接口返回值与当前图资源
            //         setFiles([...files, ...res.data.map(s => ({thumb: s}))])
            //     })
        }
    }, [files])

    // 删除 最好根据id
    const handleDelete = (key:Object)=>{
        setFiles([...files.filter(item=>item!==key)])
    }

    // 预览： 未完成
    const hanldePreview = () =>{
        console.log('preview')
    }

    return(
        <div>
            <div className="upload__main">
                {
                    files.map(( item, idx)=>(
                        <div className="upload__content" key={idx}>
                            <div className="upload__content-operation">
                               // src require
                                <img src={require('../../img/delete-icon.png')} alt="delete-icon" onClick={()=>handleDelete(item)}/>
                                <img src={require('../../img/preview-icon.png')} alt="perview-icon" onClick={()=>hanldePreview()}/>
                            </div>
                            <img key={idx} src={item.thumb} alt="" className="upload__content-img"/>
                        </div>
                    ))
                }
                <InputFile ref={inputRef} onChange={handleChange}/>
            </div>
            
        </div>
    )
}
```
uploadImage API
````
import { post } from "../http";

export const uploadImage = (files: FileList) => {
    const data = new FormData()
    for (let i = 0; i< files.length; i++) {
        data.append('files[]', files[i])
    }

    return post<{data: string[]}>('/upload', data)
}
```
文件上传需要用FormData
多文件
向formdata的key值里面多次append file
后端处理 -> 返回图片urlList 然后展示




