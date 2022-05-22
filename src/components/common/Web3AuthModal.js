// UI
import Image from "next/image";
import { Modal, Typography, Box, Button } from "@mui/material";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

// AUTH
import { useMoralis } from "react-moralis";

// ASSETS
import MetamaskLogo from "@assets/images/metamask-logo.png";
import WalletConnectLogo from "@assets/images/walletconnect-logo.png";

export default NiceModal.create(({ name }) => {
  const { authenticate, authError, account, isAuthenticated } = useMoralis();
  const modal = useModal(); // Use a hook to manage the modal state

  const AUTH_TYPE = [
    { name: "Metamask", img: MetamaskLogo, onClick: () => authenticate() },
    {
      name: "WalletConnect",
      img: WalletConnectLogo,
      onClick: () => authenticate({ provider: "walletconnect", chainId: 1 }),
    },
  ];

  return (
    <Modal
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      title="Hello Antd"
      open={modal.visible}
      onClose={() => modal.hide()}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
        }}
        width={{ xs: "75%", sm: "40%", md: "30%" }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}
        >
          Connect Wallet
        </Typography>
        {AUTH_TYPE.map((auth) => {
          return (
            <Button
              key={auth.name}
              variant="outlined"
              size="small"
              fullWidth
              sx={{ pl: 3, pr: 3, mb: 1 }}
              onClick={auth.onClick}
              startIcon={<Image src={auth.img} width="30%" height="30%" />}
            >
              {auth.name}
            </Button>
          );
        })}
      </Box>
    </Modal>
  );
});
