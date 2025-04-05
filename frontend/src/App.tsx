// Copyright (c), Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { Box, Button, Card, Container, Flex, Grid } from '@radix-ui/themes';
import { CreateAllowlist } from './CreateAllowlist';
import { Allowlist } from './Allowlist';
import WalrusUpload from './EncryptAndUpload';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { useState } from 'react';
import { CreateService } from './CreateSubscriptionService';
import FeedsToSubscribe from './SubscriptionView';
import { Service } from './SubscriptionService';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AllAllowlist } from './OwnedAllowlists';
import { AllServices } from './OwnedSubscriptionServices';
import Feeds from './AllowlistView';

function LandingPage() {
  return (
    <Grid columns="2" gap="4" className="items-center justify-center">
      <div className="col-span-2 flex justify-center">
        <Link to="/allowlist-example">
          <Button size="4">Try it</Button>
        </Link>
      </div>
    </Grid>
  );
}


function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState('');
  const [capId, setCapId] = useState('');

  return (
    <Container>
      <Flex position="sticky" px="4" py="2" justify="between">
        <h1 className="text-4xl font-bold m-4 mb-8">Sealing by Florject on Sui</h1>
        <Box>
          <ConnectButton />
        </Box>
      </Flex>

      {currentAccount ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/allowlist-example/*"
              element={
                <Routes>
                  <Route path="/" element={<CreateAllowlist />} />
                  <Route
                    path="/admin/allowlist/:id"
                    element={
                      <div>
                        <Allowlist
                          setRecipientAllowlist={setRecipientAllowlist}
                          setCapId={setCapId}
                        />
                        <WalrusUpload
                          policyObject={recipientAllowlist}
                          cap_id={capId}
                          moduleName="allowlist"
                        />
                      </div>
                    }
                  />
                  <Route path="/admin/allowlists" element={<AllAllowlist />} />
                  <Route
                    path="/view/allowlist/:id"
                    element={<Feeds suiAddress={currentAccount.address} />}
                  />
                </Routes>
              }
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <p>Please connect your wallet to continue</p>
      )}

      {/* Footer Section */}
      <footer style={{ textAlign: 'center', padding: '1rem', marginTop: '2rem' }}>
        <p>Connect with me:</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <a
            href="https://github.com/nyilynnhtwe"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit' }}
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://x.com/lynnthelight"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit' }}
          >
            <FaTwitter size={24} />
          </a>
        </div>
      </footer>
    </Container>
  );
}


export default App;
