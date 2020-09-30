import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({

    en: {
        menu: {
            Home: 'Home',
            Products: 'Products',
            Services: 'Services',
            OnlineGoods: 'Online Goods',
            EmeraldDragon: 'Emerald Dragon',
            Features: 'Features'

        },

        table: {
            actions: 'Actions',
            view: 'View',
            edit: 'Edit',
            delete: 'Delete',
            confirmDelete: 'Confirm delete',
            no: 'No',
            yes: 'Yes',
            search: 'Search'
        },

        header: {
            lock: 'Lock',
            logout: 'Logout'
        },

        filter: {
            search: 'Search'
        },

        validation: {
            RequiredErrorMessage: 'Required',
            MinLengthErrorMessage: 'Minimal length is ',
            MaxLengthErrorMessage: 'Maximal length is ',
            EmailErrorMessage: 'Please enter valid email',
            PasswordErrorMessage: 'Password must contain at least 6 letters, one upper case, one lower case and one number.',
            UserExistsErrorMessage: 'User with this email address already exists',
            OldPasswordDidNotMatch: 'Old password did not match',
            PasswordsNotEqual: 'Passwords do not match',
            notNumber: 'Not number'
        },

        notFound: {
            notFound: 'Not found!',
            dashboard: 'Dashboard'
        },

        forbidden: {
            forbidden: 'Forbidden!',
            dashboard: 'Dashboard'
        },

        error: {
            error: 'Error!',
            dashboard: 'Dashboard'
        },

        login: {
            email: 'Email',
            password: 'Password',
            login: 'Login',
            wrongCredentials: 'Wrong Credentials',
            signUpMsg: 'Don\'t have an account? Click here to sign up',
            forgetPasswordMsg: 'Do you forget password? Click here',
            googleSign: 'Login with google',
            other: 'Other login options'
        },

        signUp: {
            firstName: 'First name',
            lastName: 'Last name',
            birthday: 'Birthday',
            email: 'Email',
            password: 'Password',
            signUp: 'Sign Up',
            wrongCredentials: 'Wrong Credentials',
            gender: {
                female: 'Female',
                male: 'Male',
                other: 'Other'
            }
        },

        lock: {
            password: 'Password',
            login: 'Login',
            wrongCredentials: 'Wrong Credentials',
            unlock: 'Unlock'
        },

        userList: {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email',
            isDeleted: 'Is deleted',
            dateCreated: 'Date Created',
            pageTitle: 'Users',
            enabled: 'Enabled',
            userDelete: 'User deleted',
            userRestored: 'User restored'
        },

        userForm: {
            email: 'Email',
            firstName: 'First name',
            lastName: 'Last name',
            ok: 'Ok',
            cancel: 'Cancel'
        },

        addUser: {
            pageTitle: 'Add user',
            errorAddClub: 'Error adding user',
            clubAdded: 'User added',
            errorAddingUser: 'Error adding user',
            userAdded: 'User added'
        },

        resetPassword: {
            email: 'Email',
            resetPassword: 'Reset password',
            password: 'Password',
            passwordRepeat: 'Password repeat'
        },

        profile: {
            information: 'User Info',
            friends: 'Friends',
            posts: 'User Posts',
            profile: 'Profile',
            photos: 'Photos',
            other: 'Other',
            edit: 'Edit profile',
            changeProfilePhoto: 'Change photo',
            newPhoto: 'New photo',
            viewProfilePhoto: 'View photo',
            basicInfoTitle: 'Basic information',
            gender: 'Gender',
            birthday: 'Birthday',
            occupation: 'Occupation',
            address: 'Address',
            about: 'About',
            additionalInfoTitle: 'Additional information',
            attributes: {
                PERSONALITY: 'Personality',
                LIFESTYLE: 'Lifestyle',
                MUSIC: 'Music',
                SPORT: 'Sport',
                FILM: 'Film'
            },
            navigation: {
                action: {
                    Info: 'info',
                    Friends: 'friends',
                    Posts: 'posts',
                    Photos: 'photos',
                    Edit: 'edit'
                },
                text: {
                    Info: 'User Info',
                    Friends: 'Friends',
                    Posts: 'User Posts',
                    Photos: 'Photos',
                    Edit: 'Edit profile'
                }
            },
            friend: {
                request: 'View friend request',
                new: 'Find a new friend',
                view: 'Your friends',
                actionDialogTile: 'Friend Actions',
                action: {
                    Accept: 'Accept',
                    Decline: 'Decline',
                    Delete: 'Delete',
                    View: 'View',
                    Send: 'Send'
                },
                emptyListMessage: {
                    Friends: 'You dont have friends yet',
                    New: 'No users that are not your friends',
                    Request: 'You dont have new requests',
                }
            },
            form: {
                submit: 'Edit',
                imageError: 'Wrong image format(.jpg or .png are allowed)'
            },
            settings: {
                title: 'Settings',
                submit: 'Submit'
            }

        },
        post: {
            form: {
                search: 'Search',
                title: 'New post',
                cancel: 'Cancel',
                submit: 'Add post',
                text: 'Text',
                photo: 'Photo',
                place: 'Place',
                emoji: 'Emoji',
                style: 'Style',
                file: 'File',
                toBeImplemented: 'will be implemented',
                emoji: {
                    title: 'Emoji',
                    happy: 'happy',
                    exited: 'exited',
                    sad: 'sad',
                    relaxed: 'relaxed',
                    love: 'love'

                },
                fileError: 'Wrong file format(.pdf is allowed)'
            },
            like: 'Like',
            likes: 'likes'
        },
        comment: {
            new: 'Add comment',
            title: 'Comment',
            placeholder: 'Put your comment here',
            send: 'Send',
            plural: 'comments'
        },
        chat: {
            title: 'Chat',
            new: 'New message',
            placeholder: 'Put your message here',
            backAction: 'Back',
            newAction: 'New',
            selectPlaceholder: 'Friend\'s email',
            dialogText: 'Type your friend\'s email to start chat.'
        }
    }
});

export default strings;