import React, { useState } from 'react';
import {Button, Card, CardActions, CardContent, TextField} from "@mui/material";
import "./Login.css";
import {loginService} from "../../Service/APIService";

const LoginPage = () => {
    const [username, setUsername] = useState<String | null>('');
    const [password, setPassword] = useState<String>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("username", username);
        console.log("password", password);
        const body = {
            email: username,
            password: password
        }
        const loginResp = await loginService(body)
        if(loginResp.status === 200){
            sessionStorage.setItem("isLogin", "true");
            sessionStorage.setItem("token", loginResp.data['tokens']['access']['token']);
            window.location.href = "/home";
        }
        console.log("loginResp", loginResp.data['tokens']['access']['token']);
    };

    return (
       <>
           <div className={"login-container"}>
               <div></div>
               <div className={"card-container"}>
                   <Card sx={{ maxWidth: 475 , maxHeight: "250px", minWidth: 350, padding: "30px"}} variant="outlined" >
                       <CardContent className={"input-container"}>
                           <TextField
                               required={true}
                               type={"email"}
                               size={"medium"}
                               label={"User Email"}
                               name={"email"}
                               id={"email"}
                               value={username}
                               style={{ marginTop: "5px", width: "85%"}}
                               variant={"outlined"}
                               onChange={e => setUsername(e.target.value)}
                           />
                           <TextField
                               required={true}
                               type={"password"}
                               size={"medium"}
                               label={"Password"}
                               name={"password"}
                               id={"password"}
                               value={password}
                               style={{ marginTop: "5px", width: "85%" }}
                               variant={"outlined"}
                               onChange={e => setPassword(e.target.value)}
                           />
                       </CardContent>
                       <CardActions className={"btn-container"}>
                           <Button variant={"contained"} size="small" onClick={handleSubmit}>Login</Button>
                       </CardActions>
                   </Card>
               </div>
               <div></div>
           </div>
       </>
);
};

export default LoginPage;