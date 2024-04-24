import SignIn from "../googleSignIn/signIn";

const UserPage = observer(function UserPageRender(props){
    return (
        <div>
            <SignIn onSignIn={props.SignIn} />
        </div>
    )
}
)

export {UserPage}