var klaroConfig = {
  /*
    Setting 'testing' to 'true' will cause Klaro to not show the consent notice or
    modal by default, except if a special hash tag is appended to the URL (#klaro-
    testing). This makes it possible to test Klaro on your live website without
    affecting normal visitors.
    */
  testing: false,

  elementID: "klaro",
  storageMethod: "cookie",
  cookieDomain: 'www.tisot.info',
  storageName: "klaro",

  /*
    If set to `true`, Klaro will render the texts given in the
    `consentModal.description` and `consentNotice.description` translations as HTML.
    This enables you to e.g. add custom links or interactive content.
    */
  htmlTexts: false,

  /*
    You can change the cookie domain for the consent manager itself. Use this if you
    want to get consent once for multiple matching domains. By default, Klaro will
    use the current domain. Only relevant if 'storageMethod' is set to 'cookie'.
    */
  // cookieDomain: "tisot-blog",
  cookieExpiresAfterDays: 7,
  default: true,

  /*
    If 'mustConsent' is set to 'true', Klaro will directly display the consent
    manager modal and not allow the user to close it before having actively
    consented or declined the use of third-party services.
    */
  mustConsent: false,

  /*
    Setting 'acceptAll' to 'true' will show an "accept all" button in the notice and
    modal, which will enable all third-party services if the user clicks on it. If
    set to 'false', there will be an "accept" button that will only enable the
    services that are enabled in the consent modal.
    */
  acceptAll: false,

  /*
    Setting 'hideDeclineAll' to 'true' will hide the "decline" button in the consent
    modal and force the user to open the modal in order to change his/her consent or
    disable all third-party services. We strongly advise you to not use this
    feature, as it opposes the "privacy by default" and "privacy by design"
    principles of the GDPR (but might be acceptable in other legislations such as
    under the CCPA)
    */
  hideDeclineAll: false,

  /*
    Setting 'hideLearnMore' to 'true' will hide the "learn more / customize" link in
    the consent notice. We strongly advise against using this under most
    circumstances, as it keeps the user from customizing his/her consent choices.
    */
  hideLearnMore: false,

  noAutoLoad: false,

  /*
    You can overwrite existing translations and add translations for your service
    descriptions and purposes. See `src/translations/` for a full list of
    translations that can be overwritten:
    https://github.com/KIProtect/klaro/tree/master/src/translations
    */
  translations: {
    /*
        The `zz` key contains default translations that will be used as fallback values.
            This can e.g. be useful for defining a fallback privacy policy URL.
        */
    zz: {
      privacyPolicyUrl: "/privacy-policy/",
    },
    he: {
      privacyPolicyUrl: "/privacy-policy/",
      acceptSelected: "מאשר באופן קבוע",
      close: "סגור",
      consentNotice: {
        changeDescription: "היו שינויים מאז ביקורך האחרון, אנא אשר שוב.",
        description:
          "שלום. אנא אשר הפעלת שירותים נוספים. תוכל לשנות את בחירתך במועד מאוחר יותר.",
        learnMore: "פירוט השירותים והתאמה אישית",
        testing: "מצב בדיקה!",
      },
      consentModal: {
        description:
          "כאן תוכל להגדיר מהם השירותים אותם תרצה לאפשר באתר זה. אנא הפעל את השירותים בהם אתה מעוניין.",
        title: "שירותים בהם ברצונך להשתמש",
      },
      contextualConsent: {
        acceptAlways: "אשר לתמיד",
        acceptOnce: "אשר כעת",
        description: "האם ברצונך לטעון תוכן חיצוני שמסופק בידי {title}?",
      },
      decline: "אני מסרב",
      ok: "אני מאשר",
      poweredBy: "מסופק באמצעות 'Klaro'!",
      privacyPolicy: {
        name: "מדיניות פרטיות",
        text: "כדי ללמוד עוד, אנא קרא את מדיניות הפרטיות שלנו: {privacyPolicy}.",
      },
      purposeItem: { service: "שירות", services: "שירותים" },
      purposes: {
        advertising: {
          description:
            "שירותים אלו מעבדים מידע פרטי כדי להציג תוכן מותאם־אישית או פרסום מבוסס מרשתת.",
          title: "פרסום",
        },
        functional: {
          description:
            "שירותים אלו חיוניים עבור תפקוד תקין של האתר. כיבויים יפסיק את תפקודה התקין של האתר.\n",
          title: "אספקת שירות",
        },
        marketing: {
          description:
            "שירותים אלו מעבדים מידע אישי כדי להציג תוכן רלוונטי עבור מוצרים, שירותים, או נושאים אחרים בהם אתה עשוי להיות מעונין.",
          title: "שיווק",
        },
        performance: {
          description:
            "שירותים אלו  These services process personal information to optimize the service that this website offers.\n",
          title: "מיטוב ביצועים",
        },
      },
      save: "שמור",
      service: {
        disableAll: {
          description: "כבה או הפעל את כל השירותים באמצעות מתג זה.",
          title: "כבה או הפעל את כל השירותים",
        },
        optOut: {
          description: "שירות זה מופעל כברירת־מחדל (but you can opt out)",
          title: "(opt-out)",
        },
        purpose: "מטרה",
        purposes: "מטרות",
        required: {
          description: "שירות זה נדרש תמיד",
          title: "(נדרש תמיד)",
        },
      },
      purposes: {
        comments: {
          title: "תגובות",
        },
      },
    },
    en: {
      privacyPolicyUrl: "/privacy-policy/",
      consentModal: {
        description:
          "Here you can see and customize the information that we collect about you. " +
          'Entries marked as "Example" are just for demonstration purposes and are not ' +
          "really used on this website.",
      },
      purposes: {
        comments: {
          title: "Comments",
        },
        Analytics: {
          title: "ניתוח תעבורת רשת",
        },
        'Privacy Policy': {
          title: "מדניות־פרטיות"
        }
      },
    },
  },

  /*
    Here you specify the third-party services that Klaro will manage for you.
    */
  services: [
    {
      purposes: ["comments"],
      name: "disqus-comments",
      default: true,
      contextualConsentOnly: false,
      // required: false,
      // optOut: false,
      // onlyOnce: false,      
      translations: {
        zz: {
          title: "Disqus",
        },
        en: {
          description: "Disqus comment system",
        },
        he: {
          description: '"Disqus" מערכת התגובות',
        },
      },
      
      cookies: [
        [/^__jid.*$/, "/", "disqus.com"],
        [/^disqus_unique.*$/, "/", ".disqus.com"],
        // [/^disqus_unique.*$/, "/", "localhost"],
      ],

      /*
        You can define an optional callback function that will be called each time the
        consent state for the given service changes. The consent value will be passed as
        the first parameter to the function (true=consented). The `service` config will
        be passed as the second parameter.
      */
      callback: function (consent, service) {
        console.log(
          "User consent for service " + service.name + ": consent=" + consent
        );
      },
    },
    {
      purposes: ["analytics"],
      name: "tiny-analytics",
      default: true,
      contextualConsentOnly: false,
      onlyOnce: true,
      optOut: true,
      translations: {
        zz: {
          title: "TinyAnalytics",
        },
        en: {
          description: "TinyAnalytics - website analytics",
        },
        he: {
          description: '"TinyAnalytics" ניתוח תעבורת רשת',
        },
      },      
    },
    {
      purposes: ["privacy-policy"],
      name: "iubenda",
      default: true,
      contextualConsentOnly: false,
      onlyOnce: true,
      optOut: true,
      translations: {
        zz: {
          title: "iubenda",
        },
        en: {
          description: "'iubenda' - privacy policy provider",
        },
        he: {
          description: '"iubenda" ספק מדיניות פרטניות',
        },
      },      
    }
  ],

  callback: function (consent, service) {
    console.log(
      "User consent for service " + service.name + ": consent=" + consent
    );
  },
};
