import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { create, delectHabit, getHabits } from '../../Service/Service';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import HabitsListTemplete from './HabitsListTemplete';


function DayButton({ day, inicial, setSelectedDays, selectedDays, shipments }) {
    const [isSelectedButton, setIsSelectedButton] = useState(false);
    useEffect(() => setIsSelectedButton(false), [shipments])

    function selectDay() {
        setSelectedDays([...selectedDays, day])
        setIsSelectedButton(!isSelectedButton)
    }

    function deselectDay() {
        let numberDay = selectedDays.indexOf(day)
        selectedDays.splice(numberDay, 1)
        setIsSelectedButton(!isSelectedButton)
    }

    return (
        <>
            {isSelectedButton ? <ButtonDaySelected onClick={deselectDay}>{inicial}</ButtonDaySelected> :
                <ButtonDay onClick={selectDay}>{inicial}</ButtonDay>
            }
        </>
    )
}


export default function Habits() {
    const daysInicial = ["D", "S", "T", "Q", "Q", "S", "S"];

    const [shipments, setShipments] = useState(0)

    const navigate = useNavigate();

    const [selectedDays, setSelectedDays] = useState([]);

    const [isOpenedNewHabits, setIsOpenedNewHabits] = useState(false);

    const [myHabits, setMyHabits] = useState([]);

    const [nameHabit, setNameHabit] = useState('');

    const {reload, setReload} = useContext(UserContext);

    function handleForm(event) {
        setNameHabit(event.target.value);
    };

    function submitNewHabits() {

        const newHabitsForm = {
            name: nameHabit,
            days: selectedDays
        }

        create(newHabitsForm).then((res) => {
            setSelectedDays([])
            setNameHabit("")
            setShipments(shipments+1)
            setReload(reload+1)
        }).catch((res) => {
            alert(res.response.data.message);
            navigate('/');
        });
    }

    useEffect(() =>
        getHabits().then((res => {
            setMyHabits(res.data);
            console.log(res.data)
        })).catch((res) => {
            alert(res.response.data.message);
        }), [reload]
    )

    return (
        <Wrapper>
            <Headline>
                <h2>
                    Meus hábitos
                </h2>
                <button onClick={() => setIsOpenedNewHabits(!isOpenedNewHabits)}>
                    +
                </button>
            </Headline>
            <NewHabits isOpenedNewHabits={isOpenedNewHabits}>
                <input name='nameHabit' value={nameHabit} type="text" placeholder='nome do hábito' onChange={handleForm} />
                <WeekDays>
                    {daysInicial.map((item, index) =>
                        <DayButton
                            key={index}
                            selectedDays={selectedDays}
                            setSelectedDays={setSelectedDays}
                            inicial={item}
                            day={index + 1}
                            reload={reload}
                            setReload={setReload}
                        />)}
                </WeekDays>
                <Buttons>
                    <button onClick={() => setIsOpenedNewHabits(!isOpenedNewHabits)}>Cancel</button>
                    <input type='submit' onClick={submitNewHabits} value='Salvar'></input>
                </Buttons>
            </NewHabits>
            <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            {myHabits.map((item, index) =>
                <HabitsListTemplete
                    key={index}
                    id={item.id}
                    name={item.name}
                    days={item.days}
                    index={index}
                    daysInicial={daysInicial}
                />)}

        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 0;
    background-color: var(--background-color);
    min-height: 70vh;
    p{
        width: 85vw;
        margin-top: 20px;
        color: var(--primary-text-color);
        font-size: 20px;
    }
`
const Headline = styled.div`
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 85vw;
    h2 {
        font-size: 23px;
        color: var(--primary-color);
    }
    button {
        width: 40px;
        height: 35px;
        background-color: var(--secondary-color);
        color: var(--secundary-text-color);
        border: none;
        font-size: 25px;
        font-weight: 700;
        border-radius: 5px;
    }
`
const NewHabits = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 85vw;
    height: ${props => props.isOpenedNewHabits ? '100%' : '0'};
    overflow: hidden;
    background-color: var(--secundary-background-color);
    padding: ${props => props.isOpenedNewHabits ? '16px 0' : '0'};
    margin-top: 22px;
    border-radius: 5px;
    box-sizing: border-box;
    transition: all 0.07s linear;
    input {
        width: 90%;
        height: 45px;
        border: 1px solid var(--border-color-input);
        font-size: 20px;
        border-radius: 5px;
        padding-left: 10px;
        box-sizing: border-box;
        ::placeholder {
            padding-left: 10px;
            color: var(--border-color-input);
            font-size: 20px;
        }
    }
`
const WeekDays = styled.div`
    display: flex;
    margin: 8px 0;
    width: 90%;
    justify-content: space-between;
    flex-wrap: wrap;
`
const ButtonDay = styled.button`
    width: 35px;
    height: 35px;
    border: 1px solid var(--border-color-input);
    color: var(--border-color-input);
    background-color: var(--secundary-background-color);
    border-radius: 5px;
`
const ButtonDaySelected = styled(ButtonDay)`
    background-color: var(--selected-button-color);
    color: var(--secundary-background-color);
`
const Buttons = styled.div`
    display: flex;
    align-self: flex-end;
    margin: 10px 5vw 0 0;
    button {
        border: none;
        background-color: transparent;
        color: var(--secondary-color);
        font-size: 18px;

    }
    input {
        width: 84px;
        height: 35px;
        color: var(--secundary-background-color);
        background-color: var(--secondary-color);
        font-size: 18px;
        padding: 0;
        margin-left: 10px;
    }
`
const HabitsList = styled(NewHabits)`
    height: 91px;
    align-items: flex-start;
    padding: 5vw;
    color: var(--primary-text-color);

`
const NameAndTrash = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
`