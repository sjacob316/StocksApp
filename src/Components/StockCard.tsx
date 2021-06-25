import { Card, CardContent, IconButton, Typography } from "@material-ui/core"
import React, { useState } from "react"
import { useEffect } from "react"
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { StockService } from "../Services/StockService";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Spin } from "antd";

const StyledCard = styled(Card)`
    cursor: pointer;
    margin: 10px;
    width: 200px;
`

interface SavedStockProps {
    stockSymbol: string;
}

export const StockCard = ({stockSymbol}: SavedStockProps) => {
    const history = useHistory();
    const [price, setPrice] = useState<number>();
    useEffect(() => {
        StockService.getStockQuote(stockSymbol).then((res) => {
            console.log(res);
            setPrice(res.data.c);
        })
    }, [stockSymbol])

    const handleCardClick = () => {
        history.push(`/stocks/${stockSymbol}`);
    }
    return (
        <StyledCard variant="outlined" onClick={handleCardClick}>
            <CardContent>
                <Typography>{stockSymbol}</Typography>
                <br />
                <br />
                <Typography>{price ?? <p>0</p>}</Typography>
                {/* <IconButton>
                    <FavoriteIcon />
                </IconButton> */}
            </CardContent>
        </StyledCard>
    )
}