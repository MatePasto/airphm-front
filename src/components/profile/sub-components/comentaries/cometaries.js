import CommentaryCard from "./comentary-card";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { authService } from "../../../../services/auth.service";

export default function Comentaries() {
    const [data, setData] = useState([])

    const userLogged = async () => {
        const logged = sessionStorage.getItem('logged')
        const access = await authService.getByUsername(logged)
        const rateList = access.lodgment.map((item) => item.rate)
        // setData(rateList)
        console.log(rateList)
    }

    useEffect(() => {
        userLogged()
    }, [])

    return (
        <div className='page-conteiner'>
            <Grid container spacing={1}>
                {data.map((item) => 
                    <CommentaryCard comentary={item}/>
                )}
            </Grid>
        </div>
    )
}
