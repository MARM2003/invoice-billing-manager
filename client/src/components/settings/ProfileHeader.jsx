// import {
//     Avatar,
//     Box,
//     Card,
//     CardContent,
//     Chip,
//     Stack,
//     Typography,
// } from "@mui/material";

// const ProfileHeader = ({ profile }) => {
//     return (
//         <Card
//             elevation={0}
//             sx={{
//                 border: "1px solid",
//                 borderColor: "divider",
//                 borderRadius: 3,
//             }}
//         >
//             <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
//                 <Stack
//                     direction={{ xs: "column", sm: "row" }}
//                     spacing={2}
//                     alignItems={{ xs: "flex-start", sm: "center" }}
//                 >
//                     <Avatar
//                         src={profile.logo || undefined}
//                         alt={profile.companyName}
//                         sx={{
//                             width: 72,
//                             height: 72,
//                             border: "1px solid",
//                             borderColor: "divider",
//                         }}
//                     >
//                         {profile.companyName?.charAt(0)?.toUpperCase()}
//                     </Avatar>

//                     <Box sx={{ flex: 1 }}>
//                         <Typography
//                             variant="h6"
//                             fontWeight={700}
//                         >
//                             {profile.companyName || "Your Company"}
//                         </Typography>

//                         <Typography
//                             variant="body2"
//                             color="text.secondary"
//                             sx={{ mt: 0.5 }}
//                         >
//                             {profile.name}
//                         </Typography>

//                         <Typography
//                             variant="body2"
//                             color="text.secondary"
//                         >
//                             {profile.email}
//                         </Typography>
//                     </Box>

//                     <Chip
//                         label="Profile Completed"
//                         size="small"
//                         color="success"
//                         variant="outlined"
//                     />
//                 </Stack>
//             </CardContent>
//         </Card>
//     );
// };

// export default ProfileHeader;

import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Stack,
    Typography,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";

const ProfileHeader = ({
    profile, onEditProfile, onUpdateLogo
}) => {
    return (
        <Card
            elevation={0}
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
            }}
        >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={2}
                    alignItems={{
                        xs: "flex-start",
                        sm: "center",
                    }}
                >
                    <Avatar
                        src={profile.logo || undefined}
                        alt={profile.companyName}
                        sx={{
                            width: 72,
                            height: 72,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        {profile.companyName
                            ?.charAt(0)
                            ?.toUpperCase()}
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            {profile.companyName ||
                                "Your Company"}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {profile.name}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {profile.email}
                        </Typography>

                        <Chip
                            label="Profile Completed"
                            size="small"
                            color="success"
                            variant="outlined"
                            sx={{ mt: 1 }}
                        />
                    </Box>

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        spacing={1}
                        width={{
                            xs: "100%",
                            sm: "auto",
                        }}
                    >
                        <Button
                            variant="outlined"
                            startIcon={
                                <PhotoCameraOutlinedIcon />
                            }
                            onClick={onUpdateLogo}
                            fullWidth
                        >
                            Update Logo
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={
                                <EditOutlinedIcon />
                            }
                            onClick={onEditProfile}
                            fullWidth
                        >
                            Edit Profile
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ProfileHeader;