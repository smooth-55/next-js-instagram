import React, { useState } from "react";

import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useFormik } from "formik";

import { notification } from 'antd';
import { LoginUser } from "../../../services";
import { Button, Form } from "../../atoms";


const LoginForm = () => {

    const router = useRouter()
    const [passwordIsHide, setPasswordIsHide] = useState(true);
    const initialValues = {
        email_or_username: "",
        password: "",
    }

    const { mutate: mutateLogin } = useMutation(
        LoginUser,
        {
            onSuccess: (data) => {
                console.log(data, "data")

                const { access_token, refresh_token } = data?.data?.data
                if (access_token && refresh_token) {
                    localStorage.setItem("USER_ACCESS_TOKEN", access_token)
                    localStorage.setItem("USER_REFRESH_TOKEN", refresh_token)
                }
                notification.success({
                    message: "Login success"
                })
                // router.push("/")
            },
            onError: (error: any) => {
                console.log(error)
                notification.error({

                    message: error?.response?.data?.error
                })
            }
        }

    )
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, actions) => {
            console.log(values, "val");

            mutateLogin(values)
            actions.resetForm()
        },
    });
    const formControl = () => {
        if (formik?.values?.email_or_username.length > 0 && formik?.values?.password.length > 0) {
            return true;
        }
        return false;
    };

    const inputActiveClass = (el) => {
        if (el.length > 0) return "active";
        return "";
    };



    return (
        <Form onSubmit={formik?.handleSubmit}>
            <label className={`input-box ${inputActiveClass(formik?.values?.email_or_username)}`}>
                <input
                    className="input"
                    name={"email_or_username"}
                    value={formik?.values?.email_or_username}
                    onChange={formik?.handleChange}
                    type="text"
                />
                <span>Phone number, username, or email</span>
            </label>
            <label className={`input-box ${inputActiveClass(formik?.values?.password)}`}>
                <input
                    className="input"
                    name={"password"}
                    value={formik?.values?.password}
                    onChange={formik?.handleChange}
                    type={passwordIsHide ? "password" : "text"}
                />
                <span>Password</span>
                <button
                    className="btn"
                    type="button"
                    onClick={() => setPasswordIsHide(!passwordIsHide)}
                >
                    {passwordIsHide ? "Show" : "Hide"}
                </button>
            </label>
            <Button disabled={!formControl()}>Log In</Button>
        </Form>
    );
};

export { LoginForm };
