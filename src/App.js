import { useState } from "react";

export default function App() {
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [addDay, setAddDay] = useState("Monday");
  const [addRest, setAddRest] = useState("");
  const [newWorkouts, setNewWorkouts] = useState([]);
  const [workQuantity, setWorkQuantity] = useState(0);
  const [setQuantity, setSetQuantity] = useState(0);
  const [repQuantity, setRepQuantity] = useState(0);
  const [showEditWorkout, setShowEditWorkout] = useState(null);
  const [selection, setSelection] = useState(null);

  function handleSetSelection(value) {
    setSelection(value);
  }

  function handleFormSend(newWorkout) {
    setNewWorkouts([...newWorkouts, newWorkout]);
  }

  function handleEditFormSend(editWorkout) {
    console.log(editWorkout);
    setNewWorkouts(
      newWorkouts.map((workout) =>
        newWorkouts.indexOf(workout) === selection
          ? {
              ...workout,
              addDay: editWorkout.addDay,
              addRest: editWorkout.addRest,
              workQuantity: editWorkout.workQuantity,
              setQuantity: editWorkout.setQuantity,
              repQuantity: editWorkout.repQuantity,
              calculatedTime: editWorkout.totalTime,
            }
          : { ...workout }
      )
    );
  }

  function handleShowAddWorkout() {
    setShowAddWorkout((showAddWorkout) => !showAddWorkout);
    setShowEditWorkout(null);
  }

  function handleShowEditWorkout(theworkout) {
    setShowEditWorkout(theworkout);
    setShowAddWorkout(false);
  }
  return (
    <div>
      <Header
        handleShowAddWorkout={handleShowAddWorkout}
        showAddWorkout={showAddWorkout}
      />
      <WorkoutList
        showAddWorkout={showAddWorkout}
        newWorkouts={newWorkouts}
        handleShowEditWorkout={handleShowEditWorkout}
        handleSetSelection={handleSetSelection}
      />
      {showAddWorkout && (
        <AddWorkout
          workQuantity={workQuantity}
          setWorkQuantity={setWorkQuantity}
          setQuantity={setQuantity}
          setSetQuantity={setSetQuantity}
          repQuantity={repQuantity}
          setRepQuantity={setRepQuantity}
          addDay={addDay}
          setAddDay={setAddDay}
          addRest={addRest}
          setAddRest={setAddRest}
          handleFormSend={handleFormSend}
        />
      )}
      {showEditWorkout && (
        <EditWorkout
          showEditWorkout={showEditWorkout}
          handleEditFormSend={handleEditFormSend}
          selection={selection}
          handleShowEditWorkout={handleShowEditWorkout}
        />
      )}
    </div>
  );
}

function Header({ handleShowAddWorkout, showAddWorkout }) {
  return (
    <div className="header">
      <h1>Workout Schedule and Timing</h1>
      <button onClick={handleShowAddWorkout}>
        {showAddWorkout ? "-" : "+"}
      </button>
    </div>
  );
}

function WorkoutList({
  newWorkouts,
  handleShowEditWorkout,
  handleSetSelection,
}) {
  return (
    <ul>
      {newWorkouts.map((newWorkout) => (
        <Workouts
          newWorkouts={newWorkouts}
          newWorkout={newWorkout}
          handleShowEditWorkout={handleShowEditWorkout}
          handleSetSelection={handleSetSelection}
        />
      ))}
    </ul>
  );
}

function Workouts({
  newWorkouts,
  newWorkout,
  handleShowEditWorkout,
  handleSetSelection,
}) {
  return (
    <div>
      <li>
        <span>{newWorkout.addDay} -</span> Workouts: {newWorkout.workQuantity},
        Sets: {newWorkout.setQuantity}, Reps: {newWorkout.repQuantity},
        Rest-Duration: {newWorkout.addRest},{" "}
        <span>
          Total Time:{" "}
          {newWorkout.calculatedTime >= 1
            ? `${newWorkout.calculatedTime} Hours`
            : `${parseFloat(newWorkout.calculatedTime * 60).toFixed(
                2
              )} Minutes`}
        </span>
        <button
          onClick={() => {
            handleSetSelection(newWorkouts.indexOf(newWorkout));
            handleShowEditWorkout(newWorkout);
          }}
          className="pen-button"
        >
          🖊
        </button>
      </li>
    </div>
  );
}

function AddWorkout({
  addRest,
  addDay,
  setAddDay,
  setAddRest,
  handleFormSend,
  setRepQuantity,
  repQuantity,
  setSetQuantity,
  setQuantity,
  setWorkQuantity,
  workQuantity,
}) {
  function handleSubmitForm(e) {
    e.preventDefault();
    if (!setQuantity || !repQuantity || !workQuantity || !addRest) return;
    const calculatedTime = parseFloat(
      (setQuantity * repQuantity * workQuantity * 3 +
        workQuantity * setQuantity * addRest) /
        3600
    ).toFixed(2);
    const newWorkout = {
      addDay,
      workQuantity,
      setQuantity,
      repQuantity,
      addRest,
      calculatedTime,
    };
    handleFormSend(newWorkout);
    setWorkQuantity(0);
    setRepQuantity(0);
    setSetQuantity(0);
    setAddRest("");
    setAddDay("Monday");
  }
  return (
    <div className="parentWorkouts">
      <form className="addWorkouts" onSubmit={handleSubmitForm}>
        <h1>Add a workout</h1>
        <h3>
          Day{" "}
          <select
            value={addDay}
            placeholder="Select Day"
            onChange={(e) => setAddDay(e.target.value)}
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
        </h3>
        <h3>
          Workouts{" "}
          <select
            value={workQuantity}
            onChange={(e) => setWorkQuantity(Number(e.target.value))}
          >
            {Array.from({ length: 11 }, (_, i) => i).map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
        </h3>
        <h3>
          Sets{" "}
          <select
            value={setQuantity}
            onChange={(e) => setSetQuantity(Number(e.target.value))}
          >
            {Array.from({ length: 11 }, (_, i) => i).map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
        </h3>
        <h3>
          Reps{" "}
          <select
            value={repQuantity}
            onChange={(e) => setRepQuantity(Number(e.target.value))}
          >
            {Array.from({ length: 21 }, (_, i) => i).map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
        </h3>
        <h3>
          Rest Duration{" "}
          <input
            value={addRest ? addRest : ""}
            placeholder="In seconds whats your rest time?"
            type="number"
            onChange={(e) => setAddRest(Number(e.target.value))}
          ></input>
        </h3>
        <button>Add</button>
      </form>
    </div>
  );
}
function EditWorkout({
  showEditWorkout,
  handleEditFormSend,
  handleShowEditWorkout,
}) {
  const [addDay, setAddDay] = useState();
  const [workQuantity, setWorkQuantity] = useState();
  const [setQuantity, setSetQuantity] = useState();
  const [repQuantity, setRepQuantity] = useState();
  const [addRest, setAddRest] = useState();
  function handleEditForm(e) {
    e.preventDefault();
    const editWorkout = {
      addDay: addDay ? addDay : showEditWorkout.addDay,
      workQuantity: workQuantity ? workQuantity : showEditWorkout.workQuantity,
      setQuantity: setQuantity ? setQuantity : showEditWorkout.setQuantity,
      repQuantity: repQuantity ? repQuantity : showEditWorkout.repQuantity,
      addRest: addRest ? addRest : showEditWorkout.addRest,
      totalTime: parseFloat(
        (setQuantity ||
          showEditWorkout.setQuantity * repQuantity ||
          showEditWorkout.repQuantity * workQuantity ||
          showEditWorkout.workQuantity * 3 + workQuantity ||
          showEditWorkout.workQuantity * setQuantity ||
          showEditWorkout.setQuantity * addRest ||
          showEditWorkout.addRest) / 3600
      ).toFixed(2),
    };

    handleEditFormSend(editWorkout);
    handleShowEditWorkout();
  }
  return (
    <form onSubmit={handleEditForm} className="editWorkouts">
      <h1>Edit {showEditWorkout.addDay}'s workout</h1>
      <h3>
        Day{" "}
        <select
          value={!addDay ? showEditWorkout.addDay : addDay}
          placeholder="Select Day"
          onChange={(e) => setAddDay(e.target.value)}
        >
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </select>
      </h3>
      <h3>
        Workouts{" "}
        <select
          value={!workQuantity ? showEditWorkout.workQuantity : workQuantity}
          onChange={(workE) => setWorkQuantity(Number(workE.target.value))}
        >
          {Array.from({ length: 11 }, (_, i) => i).map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>
      </h3>
      <h3>
        Sets{" "}
        <select
          value={!setQuantity ? showEditWorkout.setQuantity : setQuantity}
          onChange={(e) => setSetQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 11 }, (_, i) => i).map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>
      </h3>
      <h3>
        Reps{" "}
        <select
          value={!repQuantity ? showEditWorkout.repQuantity : repQuantity}
          onChange={(e) => setRepQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 21 }, (_, i) => i).map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>
      </h3>
      <h3>
        Rest Duration{" "}
        <input
          value={addRest ? addRest : showEditWorkout.addRest}
          placeholder="In seconds whats your rest time?"
          type="number"
          onChange={(e) => setAddRest(Number(e.target.value))}
        ></input>
      </h3>
      <button className="change">Submit</button>
    </form>
  );
}
