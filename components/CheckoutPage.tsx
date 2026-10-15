'use client'

import convertToSubcurrency from "@/lib/convertToSubcurrency"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"

export default function checkoutPage({ amount }: { amount: number }) {
    const stripe = useStripe()
    const elements = useElements()
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "ContentType": "aplication/json",
            },
            body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
    }, [amount])

    return (
        <form>
            {clientSecret && <PaymentElement />}
            <button>Pay</button>
        </form>
    )
}