import axios from 'axios'

const Index = async (e, imageUrl) =>
{
    const file = e.target.files[0]
    const fileType = ['image/jpeg', 'image/png', 'image/gif'].includes(file?.type)

    if (file.size <= 800000)
    {

        if (fileType)
        {
            const formData = new FormData()
            formData.append("uploadFor", 'file')
            formData.append(
                'file',
                file,
                file.name
            )
            await axios.post('http://65.0.104.106/media/uploadMedia', formData)
                .then(res =>
                {
                    imageUrl(res?.data?.data[0]?.uploadedLink)
                })
                .catch(err => console.log(err))
        }
    }
    return imageUrl
}

export default Index

