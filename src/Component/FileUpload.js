import React, { useEffect, useState } from 'react'
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob'
export const FileUpload = () => {

    var [file, setFile] = useState(null)
    const [farms, setfarms] = useState([{
        "id": 1,
        "name" : "farm AAA"
    },
    {
        "id": 2,
        "name" : "farm BBB"
    }])
    const [fields, setfields] = useState([{
        "id": 1,
        "name" : "field AAA"
    },
    {
        "id": 2,
        "name" : "field BBB"
    }])
    const [years, setYears] = useState([])
    
    var [farm,setfarm] = useState('farm AAA')
    var [field,setfield] = useState('field AAA')
    var [year,setyear] = useState('1980')

    // const fetchFarms = async() =>{
    //     const res = await fetch('http://localhost:5000/farms')
    //     const data = await res.json()
    //     return data
    // }
    
    // const fetchFields = async() =>{
    //     const res = await fetch('http://localhost:5000/fields')
    //     const data = await res.json()
    //     return data
    // }
    useEffect(() => {
        setYears(fetchYears)
        
    }, [])
    const fetchYears = () =>{
        const yearsData = []
        for (let i = 1980; i < 2022; i++) {
            yearsData.push(i)
        }
        return yearsData
    }

    const onFileChange = (event)=>{
        setFile(event.target.files[0]);
        file= event.target.files[0];
       
    }

    const FarmOnChange = (event)=>{
        setfarm(event.target.value);
        farm = event.target.value;
        
    }
    const FieldOnChange = (event)=>{
        setfield(event.target.value);
        field = event.target.value;
    }
    const YearOnChange = (event)=>{
        setyear(event.target.value);
        year = event.target.value;
    }

    const uploadFile = async()=>{
        let storageAccountName = 'ntluan95';
        let sasToken = '?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwlacupx&se=2021-12-07T11:54:21Z&st=2021-10-08T02:54:21Z&spr=https&sig=Va%2Fm%2BZrSIskxpxP7RY0kk9BqoqxJydlMBLHT1Fc%2FRyw%3D';
        const blobService = new BlobServiceClient(
            `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
        );
        const containerClient = blobService.getContainerClient("myfile");
        await containerClient.createIfNotExists({
            access: 'container',
        });
        const blobClient = containerClient.getBlockBlobClient(file.name);
        const options = {blobHTTPHeaders: {blobContentType: file.type}};

        await blobClient.uploadBrowserData(file,options);
        console.log(file.name,file.type)
    }


    return (
        <div>
                <div class="container">


                    <div class="row">
                        <div class="col">
                        </div>
                        <div class="col-8">
                            <form>


                                <div class="form-group">
                                    <label for="exampleFormControlSelect1">Farm</label>
                                    <select class="form-control" id="exampleFormControlSelect1" onChange={FarmOnChange}>
                                        {
                                            // <option>{JSON.stringify(farms,null,2)}</option>
                                            farms.map((farm)=>(
                                                <option value={farm.name}>{farm.name}</option>
                                            ))
                                        }                                   
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlSelect1">Year</label>
                                    <select class="form-control" id="exampleFormControlSelect1">
                                        {
                                            // <option>{JSON.stringify(farms,null,2)}</option>
                                            years.map((year)=>(
                                                <option value={year}>{year}</option>
                                            ))
                                        }   
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlSelect2">Field</label>
                                    <select class="form-control" id="exampleFormControlSelect2">
                                    {
                                            // <option>{JSON.stringify(farms,null,2)}</option>
                                            fields.map((field)=>(
                                                <option value={field.name}>{field.name}</option>
                                            ))
                                        }   
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlInput1">DataSource</label>
                                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter DataSource" />
                                </div>

                                <div class="form-group">
                                    <label for="exampleFormControlFile1">Select file</label>
                                    <br />
                                    <input type="file" class="form-control-file" id="exampleFormControlFile1" onChange={onFileChange}/>
                                </div>
                                <br />
                                <button type="button" class="btn btn-primary mb-2" onClick={uploadFile}>Submit</button>
                            </form>
                        </div>
                        <div class="col">

                        </div>
                    </div>

                </div>
            </div>
    )
}
