import { Stack } from '@mui/system';
import blas from "../img/Blas.jpeg"
import "./CommentCard.css"
import "../Detail.css"
import StarIcon from '@mui/icons-material/Star';

const CommentCard = ({rateData}) => {
    console.log(rateData);
    return <>
        <Stack gap={2} maxWidth={"450px"} minWidth={"250px"} bgcolor={"#e6e6e6"} p={2} borderRadius={1}>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Stack flexDirection={"row"} gap={2}>
                    <img src={blas} className="profile-pic" alt="profile" />
                    <Stack gap={1}>
                        <p className="md-text bold-text">{rateData.user.name} {rateData.user.surname}  </p>
                        <p className="light-text">{rateData.date}</p>
                    </Stack>
                </Stack>
                <Stack flexDirection={"row"}>
                    <StarIcon/> <p className="bold-text">{rateData.score}</p>                    
                </Stack>
            </Stack>

            <p>{rateData.commentary}</p>
        </Stack>
    </>
}

export default CommentCard