import React, {ChangeEvent, useState} from 'react'
import {useAppSelector} from "../../../../../redux/hooks";

type ProfileStatusPT = {
    isOwner?: boolean

    updateProfileStatusRequest: (status: string) => void
}
export const ProfileStatus: React.FC<ProfileStatusPT> =
    ({
         isOwner,
         updateProfileStatusRequest
     }) => {
        const status = useAppSelector(state => state.profilePage.status)
        const [editMode, setEditMode] = useState<boolean>(false);
        const [localStatus, setLocalStatus] = useState<string>(status);


        const onTitleChanged = (e:ChangeEvent<HTMLInputElement>) => {
            setLocalStatus(e.target.value);
        }
        const toggleEditMode = () => {
            setEditMode(!editMode);
        }
        const onUpdateProfileStatus = () => {
            toggleEditMode();
            if (status !== localStatus)
                updateProfileStatusRequest(localStatus)
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

