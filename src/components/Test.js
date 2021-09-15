import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Test = () => {
    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [subdistrict, setSubdistrict] = useState(null);
    const [dataProvince, setDataProvince] = useState();
    const [dataDistrict, setDataDistrict] = useState();
    const [dataSubDistrict, setDataSubDistrict] = useState();

    const queryProvinces = () => {
        fetch("https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces", {
            method: "GET",
            body: JSON.stringify(),
        }).then((response) => response.json())
            .then(result => {
                setDataProvince(result.data);
            })
    }

    async function queryDistrict(p) {
        await fetch("https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/" + p + "/district", {
            method: "GET",
            body: JSON.stringify(),
        }).then((response) => response.json())
            .then(result => {
                setDataDistrict(result.data);
            })
    }

    async function querySubDistrict(d) {
        await fetch("https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/" + province + "/district/" + d, {
            method: "GET",
            body: JSON.stringify(),
        }).then((response) => response.json())
            .then(result => {
                setDataSubDistrict(result.data);
            })
    }

    

    const handleChange = (event) => {
        if (event.target.name === "province") {
            setProvince(event.target.value);
            queryDistrict(event.target.value);
        } else if (event.target.name === "district") {
            setDistrict(event.target.value);
            querySubDistrict(event.target.value);
        } else if (event.target.name === "subdistrict") {
            setSubdistrict(event.target.value);
        }

    };


    useEffect(() => {
        if (province === null) {
            queryProvinces();
        }

    }, [])
    console.log(dataDistrict);
    const classes = useStyles();

    return (<div>


        <FormControl className={classes.formControl}>
            <InputLabel id="province"  >province</InputLabel>
            <Select labelId="province" id="province" name="province" value={province} onChange={handleChange}>

                <MenuItem value=""><em>None</em></MenuItem>
                {dataProvince ? dataProvince.map((key) => (<MenuItem value={key.province}>{key.province}</MenuItem>)) : <></>}

            </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
            <InputLabel id="district"  >district</InputLabel>
            <Select labelId="district" id="district" name="district" value={district} onChange={handleChange}>

                <MenuItem value=""><em>None</em></MenuItem>
                {dataDistrict ? dataDistrict.map((district) => (<MenuItem value={district}>{district}</MenuItem>)) : <></>}

            </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
            <InputLabel id="subdistrict"  >subdistrict</InputLabel>
            <Select labelId="subdistrict" id="subdistrict" name="subdistrict" value={subdistrict} onChange={handleChange}>

                <MenuItem value=""><em>None</em></MenuItem>
                {dataSubDistrict ? dataSubDistrict.map((subdistrict) => (<MenuItem value={subdistrict}>{subdistrict}</MenuItem>)) : <></>}

            </Select>
        </FormControl>
    </div>)

}


export default Test