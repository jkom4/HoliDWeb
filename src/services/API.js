import emailjs from "@emailjs/browser";



//const apiUrl = "http://studapps.cg.helmo.be:5010/REST_AHME_VERD_WABO"
const API_keyCurrentWeather = '82f4768ca7650d896603a5eb038218c6'


function convertToOffsetDateTime(date) {
    return new Date(date).toISOString();
}


class API {

    static  SignUp(signUpFields) {
        const datalogin = {
            "email": signUpFields.email,
            "nom": signUpFields.name,
            "passwd": signUpFields.password,
            "prenom": signUpFields.firstname
        }
        console.log(datalogin)
        return  fetch(`/user/signup`,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datalogin)
            }).then(async response => {
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`${errorData.message}! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(data => data)
            .catch(error => { throw error})

    }

    static SignIn(signinFields) {
        const datalogin = {
            "email": signinFields.email,
            "passwd": signinFields.password
        }
        console.log(datalogin)
        return fetch(`/user/signin`,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    datalogin)
            }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(
                data => data
            )
            .catch((e) => {
                console.error('Error during sign-in:', e);
                throw e; // Propagate the error for further handling
            })

    }
    static SignInWithProvider(signinFields) {
        const dataFetch = {
            "email": signinFields.email,
            "nom": signinFields.family_name,
            "prenom": signinFields.given_name
        }
        console.log(dataFetch)
        return fetch(`/user/signinWithProvider`,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    dataFetch)
            }).then(response => {
            if (!response.ok) {
                console.log(response)
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })

            .then(
                data => data
            )
            .catch((e) => {
                console.error('Error during sign-in Google:', e);
                throw e; // Propagate the error for further handling
            })

    }

    static nbrUser(formFields) {

        return fetch(`/user/nbrUserAndNbrUserInHolidayForADate?dateTime=${convertToOffsetDateTime(formFields.dateDebut)}`,
            {
                method: 'GET',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
            if (!response.ok) {
                console.log(response)
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(data => data)
            .catch(error => console.log(error))

    }


    static SendContact(contactState) {
        //Ajouter les parametres au templates
        const templateParams = {
            from_name: contactState.name,
            from_email: contactState.email,
            to_name: "HolidWeb",
            message: contactState.message,
            to_email : contactState.to_email
        }
        return emailjs.send('service_j0c53oa', 'template_snvzy7p', templateParams, 'u6h54fqSWVWd4Tc1e');

    }


    static AddVacance(fiedls,lieu) {
        const storedToken = localStorage.getItem('token');

        const datafiels = {
            "dateDebut": convertToOffsetDateTime(fiedls.dateDebut),
            "dateFin": convertToOffsetDateTime(fiedls.dateFin),
            "description": fiedls.description,
            "lieu": lieu,
            "nom": fiedls.nom,
        }
        console.log(storedToken)
        return fetch(`/vacance`,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${storedToken}`

                },
                body: JSON.stringify(
                    datafiels)
            }).then(response => {
            if (!response.ok) {

                console.log(response)
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(
                data => data
            )
            .catch((e) => {
                console.error('Error during add-Vacance:', e);
                throw e; // Propagate the error for further handling
            })

    }

    static async addParticipant(email,idVacance) {
        const storedToken = localStorage.getItem('token');

        const datafields = {
            "email": email
        }
        console.log(datafields)
        return fetch(`/vacance/${idVacance}/participant`,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${storedToken}`

                },
                body: JSON.stringify(
                    datafields)
            }).then(response => {
            if (!response.ok) {

                console.log(response)
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(
                data => data
            )
            .catch((e) => {
                console.error('Error during add-Participant:', e);
                throw e; // Propagate the error for further handling
            })
    }

    static async addParticipantActivite(email, idVacance, idActivite) {
        const storedToken = localStorage.getItem('token');

        const datafields = {
            "email": email
        }
        console.log(datafields)
        return fetch(`/vacance/${idVacance}/activite/${idActivite}/participant`,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${storedToken}`

                },
                body: JSON.stringify(
                    datafields)
            }).then(response => {
            if (!response.ok) {

                console.log(response)
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(
                data => data
            )
            .catch((e) => {
                console.error('Error during add-Participant Activité:', e);
                throw e; // Propagate the error for further handling
            })
    }
    static  currentweather(latlng){
        return  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latlng.lat}&lon=${latlng.lon}&cnt=30&units=metric&lang=fr&appid=${API_keyCurrentWeather}`)
            .then(response => response.json())

    }


    static AddActivite(fiedls,lieu,idVac) {
        const storedToken = localStorage.getItem('token');

        const datafiels = {
            "dateDebut": convertToOffsetDateTime(fiedls.dateDebut),
            "dateFin": convertToOffsetDateTime(fiedls.dateFin),
            "description": fiedls.description,
            "lieu": lieu,
            "nom": fiedls.nom,
        }
        console.log(datafiels)
        return fetch(`/vacance/${idVac}/activite`,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${storedToken}`
                },
                body: JSON.stringify(
                    datafiels)
            }).then(response => {
            if (!response.ok) {
                console.log(response)
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(data =>data)
            .catch((e) => {
                console.error('Error during add-Activite:', e);
                throw e; // Propagate the error for further handling
            })

    }

    static async ModifActivite(dateDebut, dateFin, idVacance, idActivite) {
        const storedToken = localStorage.getItem('token');

        const datafiels = {
            "dateDebut": convertToOffsetDateTime(dateDebut),
            "dateFin": convertToOffsetDateTime(dateFin),
        }
        console.log(datafiels)
        return fetch(`/vacance/${idVacance}/activite/${idActivite}/changeDates`,
            {
                method: 'PUT',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${storedToken}`

                },
                body: JSON.stringify(
                    datafiels)
            }).then(response => {
            if (!response.ok) {
                console.log(response)
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(data =>data)
            .catch((e) => {
                console.error('Error during add-Activite:', e);
                throw e; // Propagate the error for further handling
            })
    }
    static async SendMessage(idVacance, content) {
        const storedToken = localStorage.getItem('token');

        const datafiels = {
            "content": content,
        }
        return fetch(`/vacance/${idVacance}/message`,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${storedToken}`

                },
                body: JSON.stringify(
                    datafiels)
            }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(data =>data)
            .catch((e) => {
                console.error('Error during sendMessage:', e);
                throw e; // Propagate the error for further handling
            })
    }
    static async GetTheTop100Messages(idVacance) {
        const storedToken = localStorage.getItem('token');

        return fetch(`/vacance/${idVacance}/message`,
            {
                method: 'GET',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${storedToken}`
                }
            }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.json()
            }
        })
            .then(data =>data)
            .catch((e) => {
                console.error('Error during getMessage:', e);
                throw e; // Propagate the error for further handling
            })
    }
}




export default API
