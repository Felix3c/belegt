# Credits

> Understanding EUrouter's credit system for API usage and billing.

Source: https://www.eurouter.ai/docs/concepts/credits

***

## How billing works [#how-billing-works]

EUrouter separates platform access from AI usage:

* **Subscription** — A monthly plan that gives you access to EUrouter's routing, fallbacks, and EU infrastructure
* **Credits** — Prepaid balance used to pay for AI tokens at cost

***

## Adding credits [#adding-credits]

1. Go to your [Dashboard](/dashboard)
2. Navigate to **Billing**
3. Select an amount
4. Complete payment

Credits are added instantly.

***

## Pricing [#pricing]

You're charged based on token usage:

* **Input tokens** — The tokens in your prompt
* **Output tokens** — The tokens in the response (typically more expensive)

Each model has its own pricing. Check the [Models page](/models) for current rates.

### Currency conversion [#currency-conversion]

All costs are calculated in EUR. If a provider charges in USD or another currency, we convert it using the daily ECB exchange rate.

### Cost calculation [#cost-calculation]

```
Cost = (Input Tokens × Input Price) + (Output Tokens × Output Price)
```

***

## Minimum balance [#minimum-balance]

A minimum balance of **€0.10** is required to make requests. This ensures your requests can complete without interruption.

If your balance is too low, you'll receive a `402 Payment Required` error:

```json
{
  "error": {
    "code": "payment_required",
    "message": "Insufficient balance"
  }
}
```

***

## Checking your balance [#checking-your-balance]

### Via dashboard [#via-dashboard]

View your balance and usage history in the [Dashboard](/dashboard).

### Via API [#via-api]

```bash
curl https://api.eurouter.ai/api/v1/credits \
  -H "Authorization: Bearer $EUROUTER_API_KEY"
```

***

## Usage tracking [#usage-tracking]

The dashboard shows usage breakdowns:

* **By model** — Which models consume the most credits
* **By time** — Daily, weekly, and monthly trends
* **By request** — Individual request costs

***

## Cost control [#cost-control]

### Usage limits [#usage-limits]

Set monthly spending limits to cap your usage.

### Tips [#tips]

* Use smaller models for simple tasks
* Keep prompts concise
* Monitor usage regularly

***