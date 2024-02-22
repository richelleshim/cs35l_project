import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import Link from '@mui/joy/Link';

export default function CardItem({image, onCardClick}){
    return(
        <>
        <Card sx={{ width:250, height:250, flexGrow: 1}}>
            <CardCover>
                <img
                    src={image}
                    alt='image'
                /> 
                <Link overlay onClick={onCardClick}/>  
            </CardCover>
        </Card>
        
        </>   
    )
}

