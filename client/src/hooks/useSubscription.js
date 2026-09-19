// import { useCallback, useEffect, useState } from "react";

// import {
//     getSubscriptionPlansService,
//     getMySubscriptionService,
//     createSubscriptionCheckoutService,
// } from "../services/subscription.service.js";

// const useSubscription = () => {
//     const [plans, setPlans] = useState([]);
//     const [subscription, setSubscription] = useState(null);

//     const [loading, setLoading] = useState(true);
//     const [checkoutLoading, setCheckoutLoading] = useState(false);

//     const fetchSubscriptionData = useCallback(async () => {
//         try {
//             setLoading(true);

//             const [plansResponse, subscriptionResponse] =
//                 await Promise.all([
//                     getSubscriptionPlansService(),
//                     getMySubscriptionService(),
//                 ]);

//             setPlans(plansResponse.data);
//             setSubscription(subscriptionResponse.data);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchSubscriptionData();
//     }, [fetchSubscriptionData]);

//     const subscribe = async (plan) => {
//         try {
//             setCheckoutLoading(true);

//             const response =
//                 await createSubscriptionCheckoutService(plan);

//             window.location.href = response.data.checkoutUrl;
//         } finally {
//             setCheckoutLoading(false);
//         }
//     };

//     return {
//         plans,
//         subscription,
//         loading,
//         checkoutLoading,
//         subscribe,
//         refresh: fetchSubscriptionData,
//     };
// };

// export default useSubscription;
import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    getSubscriptionPlansService,
    getMySubscriptionService,
    createSubscriptionCheckoutService,
} from "../services/subscription.service.js";

const useSubscription = () => {
    const [plans, setPlans] = useState([]);
    const [subscription, setSubscription] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [checkoutLoading, setCheckoutLoading] =
        useState(false);

    const fetchSubscription =
        useCallback(async () => {
            try {
                setLoading(true);

                const [
                    plansResponse,
                    subscriptionResponse,
                ] = await Promise.all([
                    getSubscriptionPlansService(),
                    getMySubscriptionService(),
                ]);

                setPlans(plansResponse.data);
                setSubscription(
                    subscriptionResponse.data
                );
            } catch (error) {
                console.error(
                    "Failed to fetch subscription:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }, []);

    useEffect(() => {
        fetchSubscription();
    }, [fetchSubscription]);

    const subscribe = async (plan) => {
        try {
            setCheckoutLoading(true);

            const response =
                await createSubscriptionCheckoutService(
                    plan
                );

            window.location.href =
                response.data.checkoutUrl;
        } catch (error) {
            console.error(
                "Subscription checkout failed:",
                error
            );
        } finally {
            setCheckoutLoading(false);
        }
    };

    return {
        plans,
        subscription,
        loading,
        checkoutLoading,
        subscribe,
        refresh: fetchSubscription,
    };
};

export default useSubscription;