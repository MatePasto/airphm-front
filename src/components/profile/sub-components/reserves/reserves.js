import ReserveCrad from "./reserve-card";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { authService } from "../../../../services/auth.service";

export default function Reserves() {
    const [data, setData] = useState([])

    const userLogged = async () => {
        const logged = sessionStorage.getItem('logged')
        const access = await authService.getByUsername(logged)
        setData(access.reserves)
    }

    useEffect(() => {
        userLogged()
    }, [])

    return (
        <div className='page-conteiner'>
            <Grid container spacing={1}>
                {data.map((item) => 
                    <ReserveCrad key={item.lodgmentId} reserve={item} />
                )}
            </Grid>
        </div>
    )
}
