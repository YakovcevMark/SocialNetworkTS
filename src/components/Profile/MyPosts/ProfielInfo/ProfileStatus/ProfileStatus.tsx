import React, {ChangeEvent, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../../../../../redux/hooks";
import {updateProfileStatusRequest} from "../../../../../redux/profilePageReducer";

type ProfileStatusPT = {
    isOwner?: boolean
}
export const ProfileStatus: React.FC<ProfileStatusPT> =
    ({
         isOwner,
     }) => {
        const status = useAppSelector(state => state.profilePage.status)
        const [editMode, setEditMode] = useState<boolean>(false);
        const [localStatus, setLocalStatus] = useState<string>(status);
        const dispatch = useAppDispatch()

        const onTitleChanged = (e:ChangeEvent<HTMLInputElement>) => {
            setLocalStatus(e.target.value);
        }
        const toggleEditMode = () => {
            setEditMode(!editMode);
        }
        const onUpdateProfileStatus = () => {
            toggleEditMode();
            if (status !== localStatus)
                dispatch(updateProfileStatusRequest(localStatus))
        }
        return <div>
            {editMode && isOwner
                ? <div>
                    <input autoFocus={true}
                           onBlur={onUpdateProfileStatus}
                           value={localStatus}
                           onChange={onTitleChanged}>
                    </input>
                </div>
                : <div>
                      <span onDoubleClick={toggleEditMode}>
                          {localStatus || "Update status"}
                      </span>
                </div>
            }
        </div>

    }

