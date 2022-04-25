import { IconButton, Tooltip } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteMessageButton = () => {
  return (
    <Tooltip title="削除する" placement="top" arrow>
    <IconButton>
      <DeleteIcon />
    </IconButton>
    </Tooltip>
  )
}
