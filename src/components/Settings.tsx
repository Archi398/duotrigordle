import React, { useState } from 'react';
import cn from "classnames";
import { useDispatch } from "react-redux";
import { hidePopups, updateSettings, useSelector } from "../store";

export function Settings() {
  const dispatch = useDispatch();
  const shown = useSelector((s) => s.popups.settings);
  const {
    colorBlindMode,
    showTimer,
    wideMode,
    hideCompletedBoards,
    animateHiding,
    hideKeyboard,
  } = useSelector((s) => s.settings);
  
  function reset() {
    localStorage.clear(); 
    window.location.reload();
  }

  const [nb_board, setNb_board] = React.useState('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let val = (document.getElementById('nb-board') as HTMLInputElement).value;
    localStorage.setItem('NUM_BOARDS', val);
    window.location.reload();
  }


  return (
    <div className={cn("popup-wrapper", !shown && "hidden")}>
      <div className="popup">
        <div className="group">
          <input
            type="checkbox"
            id="colorblind-mode"
            checked={colorBlindMode}
            onChange={(e) =>
              dispatch(updateSettings({ colorBlindMode: e.target.checked }))
            }
          />
          <label htmlFor="colorblind-mode">Mode daltonien</label>
        </div>
        <div className="group">
          <input
            type="checkbox"
            id="show-timer"
            checked={showTimer}
            onChange={(e) =>
              dispatch(updateSettings({ showTimer: e.target.checked }))
            }
          />
          <label htmlFor="show-timer">Afficher le chrono du speedrun</label>
        </div>
        <div className="group">
          <input
            type="checkbox"
            id="wide-mode"
            checked={wideMode}
            onChange={(e) =>
              dispatch(updateSettings({ wideMode: e.target.checked }))
            }
          />
          <label htmlFor="wide-mode">Mode large</label>
        </div>
        <div className="group">
          <input
            type="checkbox"
            id="hide-completed-boards"
            checked={hideCompletedBoards}
            onChange={(e) =>
              dispatch(
                updateSettings({ hideCompletedBoards: e.target.checked })
              )
            }
          />
          <label htmlFor="hide-completed-boards">Cacher les planches terminées</label>
        </div>
        <div
          className={cn(
            "group",
            "animate-hiding",
            !hideCompletedBoards && "active"
          )}
        >
          <input
            type="checkbox"
            id="animate-hiding"
            checked={animateHiding}
            onChange={(e) =>
              dispatch(updateSettings({ animateHiding: e.target.checked }))
            }
            disabled={!hideCompletedBoards}
          />
          <label htmlFor="animate-hiding">Fade out</label>
        </div>
        <div className="group">
          <input
            type="checkbox"
            id="hide-keyboard"
            checked={hideKeyboard}
            onChange={(e) =>
              dispatch(updateSettings({ hideKeyboard: e.target.checked }))
            }
          />
          <label htmlFor="hide-keyboard">Cacher le clavier</label>
        </div>
        <div className="group">
          <hr/>
          <form id="form-nb-board" onSubmit={handleSubmit}>
            <label className="item-form-nb-board">
              Choisissez votre nombre de planches :
            </label>
            <input className="item-form-nb-board" type="number" id="nb-board" min={1} max={99} value={nb_board} onChange={(e) => setNb_board(e.target.value)}/>
            <input className="item-form-nb-board" type="submit" value="Submit" />
          </form>
          <hr/>
        </div>
        <button className="reset" onClick={reset}>
          Réinitialisation complète
        </button>
        <button className="close" onClick={() => dispatch(hidePopups())}>
          Fermer
        </button>
      </div>
    </div>
  );
}
