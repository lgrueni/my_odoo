class MyTerminalListener extends timapi.DefaultTerminalListener {
    constructor(_context, _QWeb)
    {
      super();
      this.context = _context;
      this.QWeb = _QWeb;
    }

    activateCompleted(event, data)
    {
      this.context.pos.session.six_terminal_init_done = true;
    }

    transactionCompleted(event, data){
      super.transactionCompleted(event, data);

      var errorFrench = {
        apiCancelEcr: "Requête annulée par le point de vente",
        apiConnectFailServer: "Le point de vente ne peut pas se connecter à TIM API",
        apiConnectFailTerminal: "Le point de vente ne peut pas se connecter au terminal",
        apiConnectionLostServer: "Le point de vente n'est plus connecté à TIM API",
        apiConnectionLostTerminal: "Le point de vente a perdu la connexion avec le terminal",
        apiDisabledFeature: "La requête ne peut pas être exécutée car la fonction n'est pas installée",
        apiFunctionDisallowed: "Cette fonction n'est pas autorisée avec la licence actuelle",
        apiInvalidAnswer: "Le point de vente a reçu une réponse incorrecte",
        apiPersistencyProblem: "Données persistantes endommagées, stockage saturé ou problème de stockage",
        apiTimeoutServer: "Timeout durant l'établissement de la connexion entre TIM API et TIM SERVER",
        apiTimeoutTerminal: "Timout durant la connexion entre TIM API et le terminal",
        basketDeclined: "Une partie du panier a été refusé",
        busyMaintenance: "Tâche de maintenance en cours",
        busyOtherController: "Un autre contrôlleur utilise le terminal",
        cardErrorCcr: "Erreur de lecture de la puce",
        cardErrorMcr: "Erreur de lecture de la bande magnétique",
        cardErrorNfc: "Erreur de lecture du NFC (Sans contact)",
        cardFunctionNotAllowed: "Fonction de la carte pas autorisée",
        cardFunctionNotFound: "Fonction de la carte inconnue",
        cardholderStop: "Interruption de la part du client",
        cardholderTimeout: "Le client a mis trop de temps à réagir",
        cardInsertionTimeout: "Le client a mis trop de temps à insérer la carte",
        cardInvalidData: "Données de la cartes pas valables",
        cardNotReadable: "La carte ne peut pas être lue",
        cardReaderErrorCcr: "Erreur du lecteur de puce",
        cardReaderErrorMcr: "Erreur du lecteur de bande magnétique",
        cardReaderErrorNfc: "Erreur du lecteur NFC (Sans contact)",
        cardReaderKeysLost: "Clés de chiffrement perdues",
        cardReadError: "Erreur durant la lecture de la carte",
        cardReaderSecurityError: "Erreur de sécurité",
        cardReadTimeout: "Timeout pendant la lecture de la carte",
        cardRemoved: "Le client a retiré la carte",
        cardTimeout: "La carte a mis trop de temps à répondre",
        cardUnexpectedlyPresentInReader: "Carte présente de manière inattendue dans le lecteur de carte",
        cashbackAmountTooHigh: "Le montant de cashback est trop élevé",
        cashbackAmountTooLow: "Le montant de cashback est trop faible",
        ccrUnavailable: "Le lecteur de puce n'est pas disponible",
        declinedAutoreversalPending: "Échec de l'autorisation",
        declinedCaptureCardGeneric: "Garder la carte, c'est un générique",
        declinedCaptureCardInfoToClient: "Garder la carte, informer le client",
        declinedCaptureCardOrderToClient: "Garder la carte, commande au client",
        declinedCaptureCardTimeoutRemovingCard: "Timeout lors du retrait de la carte",
        declinedCardBlocked: "Autorisation a échouée, carte bloquée",
        declinedCardError: "Autorisation a échouée,erreur de la carte",
        declinedCardExpired: "Autorisation a échouée, carte échue",
        declinedCardholderInformationIssue: "Autorisation a échouée, problème d'informations sur le titulaire de la carte",
        declinedCvmFailed: "La méthode de vérification du titulaire de la carte a échoué",
        declinedDoubleTransaction: "Autorisation a échouée, la transaction est peut-être un doublon",
        declinedGeneric: "Autorisation a échouée, erreur générique",
        declinedGenericFirstAc: "Autorisation a échouée, première génération AC a échoué",
        declinedGenericSecondAc: "Autorisation a échouée, deuxième génération AC a échoué",
        declinedInvalidMerchant: "Autorisation a échoué, mauvais vendeur",
        declinedNotSupported: "Autorisation a échouée, pas supporté",
        declinedReferralOtherReason: "Autorisation a échouée, référence générique",
        declinedReferralWrongAmount: "Autorisation a échouée, mauvais montant",
        declinedReferralWrongAuthCode: "Autorisation a échouée, mauvais code d'authentification",
        declinedRestrictionDeclined: "Autorisation a échouée, restrictions refusées",
        declinedRetryTemporaryUnavailable: "Autorisation a échouée, temporairement pas disponible, réessayer",
        declinedSaldoTooLow: "Autorisation a échouée, solde trop bas",
        declinedSecurityIssue: "Autorisation a échouée, problème de sécurité",
        declinedServiceNotAllowed: "Autorisation a échouée, le service n'est pas autorisé",
        declinedTrxInvalid: "Autorisation a échouée, la trasaction est invalide",
        declinedTryAnotherInterface: "Autorisation a échouée, essayer une autre interface",
        declinedTryLater: "Autorisation a échouée, essayer plus tard",
        declinedUsageControl: "Autorisation a échouée, contrôle d'usage",
        declinedWrongCardExpiryDate: "Autorisation a échouée, la date d'expiration n'est pas valide",
        declinedWrongCardNumber: "Autorisation a échouée, le numéro de la carte n'est pas valide",
        declinedWrongCurrency: "Autorisation a échouée, mauvaise devise",
        declinedWrongPin: "Autorisation refusée, le code PIN est éronné",
        displayUnavailable: "Écran pas disponible",
        ethernetDisconnected: "Aucun câble Ethernet n'est connecté",
        invalidArgument: "L'argument donné n'est pas valide",
        invalidState: "L'API est dans un statut pas valide",
        loyaltyCheckInPending: "Jusqu'à présent, aucune donnée de fidélité n'est disponible, enregistrement en attente",
        mcrUnavailable: "Lecteur de bande magnétique indisponible",
        nfcUnavailable: "Lecteur NFC (sans contact) indisponible",
        noTrxInGroupExceeded: "La transaction en cours dépasse la limite du nombre de transactions dans un groupe.",
        ok: "OK",
        outOfMemory: "L'affectation de mémoire à TIM API a échoué",
        pinPadKeysLost: "Les clés pour la communication sécurisées ont été perdues",
        pinPadSecurityError: "Erreur de sécurité",
        pinPadTampered: "Le PinPad a été trafiqué",
        pinPadUnavailable: "PinPad indisponible",
        requestPending: "Une autre requête du même controlleur est en cours",
        rs232Disconnected: "La connexion RS232 a été interompue",
        rs232NotConfigured: "L'appareil connecté en RS232 n'est pas configuré",
        rs232Unavailable: "L'appareil connecté en RS232 n'est pas disponible",
        serverConnectFailTerminal: "Le serveur TIM n'arrive pas à se connecter au terminal",
        serverConnectionLostTerminal: "Le serveur TIM a perdu la connexion avec le terminal",
        serverDisabledFeature: "Le serveur TIM à reçu une requête pour une fonction désactivée",
        serverInvalidAnswer: "Le serveur TIM à reçu une réponse pas valide",
        serverInvalidRequest: "Le serveur TIM à reçu une requête pas valide de TIM API",
        serverPersistencyProblem: "Les données persistantes ont été endommagées",
        serverTimeoutTerminal: "Timeout lors d la connexion du serveur au terminal",
        sixmlGeneralError: "Erreur générale sur le protocole SIX",
        sixmlInvalidRequest: "Requête SIX pas valide",
        sixmlUnknownReferenceNumber: "Numéro de référence pas valide",
        sixmlUnsupportedRequest: "Requête pas supportée par le terminal",
        sixmlWrongCashier: "Mauvais ID de l'utilisateur",
        sixmlWrongEcrId: "Mauvais ID du point de vente",
        sixmlWrongState: "Requête pas admise dans l'état actuel du terminal",
        swAuthenticationFailed: "l'authentification SIX a échoué",
        swInstallationFailed: "Erreur lors de la mise à jour du software",
        swVersionNotSuitable: "Version logiciel pas compatible",
        systemError: "Erreur système",
        timCommunicationFailure: "Erreur de communication",
        timConfigFailure: "La configuration a échouée",
        timConnectFailPaymentHost: "Le terminal n'arrive pas à se connecter au serveur de paiement",
        timConnectionLostPaymentHost: "Perte du serveur de paiement",
        timInitFailure: "Erreur de l'initialisation de TIM API",
        timTimeoutAnswerRs232: "Le périphérique a mis trop de temps à répondre",
        timTimeoutEcr: "Le point de vente n'a pas répondu à temps",
        transactionMismatch: "Une fonction n'est pas compatible",
        trxCommitTimeout: "La demande de commit n'as pas été envoyée à temps",
        trxInvalidAuthResponse: "La réponse lors de l'autorisation n'est pas valide",
        trxLimitExceeded: "Le montant excède la limite",
        trxNoCommonApplications: "Pas d'application trouvée sur la carte",
        trxNoCommonCvm: "Pas de méthode de vérification du détenteur de la carte trouvée",
        trxReferral: "Référence demandée pour la transaction actuelle",
        trxRollbackImpossible: "Retout en arrière impossible pour la transaction actuelle",
        unsupportedCharactersInMessage: "La requête contient des caractères pas supportés",
        valueOutOfRangeInThisContext: "La valeur entrée n'est pas valable (Seulement des nombres positifs sont admmis)",
        voucherCannotBeReversed_: "Le bon (recharge mobile) ne peut pas être annulé",
        voucherTypeNotAvailable: "Le bon (recharge mobile) ne peut pas être généré avec cette combinaison émetteur et valeur",
      };

      // Check if transaction has been successful
      if (event.exception === undefined)
      {
        //Transaction OK
        //Get the ID of the transaction
        this.context.pos.order.six_transaction_ID = event.terminal.getTransactionData().trmTransRef;
        //Closing the order
        this.context.pos.pos_widget.payment_screen.validate_order();
      }
      else
      {
        //Transaction Error
        this.context.pos.pos_widget.screen_selector.show_popup('error',{
          message: _t('Erreur lors de la transaction:'),
          comment: _t(errorFrench[event.exception.resultCode] + " (" + event.exception.resultCode + ")"),
        });
      }
     }

    printReceipts(terminal, printData)
    {
      if(printData.receipt != undefined)
      {
        //Line separation
        var dataFormat = printData.receipt.value.split('\n');

          //Put data in dictionnary
          var dataToPrint = {
            data: dataFormat,
          };

        //Launch print
        this.context.pos.proxy.print_receipt(this.context.QWeb.render('sixMerchantReceipt',{
          receipt: myPrintData.receipt.value, widget: this.context.self,
        }));
      }

      if(printData.receipts != undefined)
      {
        for (var i = 0; i < printData.receipts.length; i++)        
        {
          //Line separation
          var dataFormat = printData.receipts[i].value.split('\n');

          //Put data in dictionnary
          var dataToPrint = {
            data: dataFormat,
          };

          //Launch print
          this.context.pos.proxy.print_receipt(this.QWeb.render('sixReceipt',{
            receipt: dataToPrint, widget: this.context.self,
          }));
        }
      }
    }

    terminalStatusChanged(terminal)
    {
      var terminalStateFrench = {
        applicationSelection: "Selection en cours, l'interaction du client peut être demandée",
        busy = "Terminal occupé",
        dccSelection = "Sélection DCC en cours",
        enterTip = "Entrée en cours",
        idle = "Aucune transaction en cours",
        pinEntry = "Saisie du code PIN",
        processing = "Le paiement est en cours",
        readingCard = "Lecture de la carte",
        signatureCapture = "La signature CVM a été sélectionnée. Capture de signature en cours",
        waitForCard = "Attente de l'insertion de la carte",
        waitForCommit = "Attente du commit",
        waitForProceed = "Attente sur une autre commande",
      };

      var terminalState = terminal.getTerminalStatus().transactionStatus.name;

      this.context.pos.pos_widget.screen_selector.close_popup();
      
      if(terminalState != 'idle')
      {
        this.context.pos.pos_widget.screen_selector.show_popup('info',{
          'message': _t('Statut de la transaction'),
          'comment': _t(terminalStateFrench[terminalState]),
        });
      }
    }
}
