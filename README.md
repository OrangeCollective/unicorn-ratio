# The Unicorn Ratio

A framework for optimizing startup portfolio construction when investing in cohorts, using the Kelly Criterion and Binomial Distribution. Built for [Orange Collective](https://orangecollective.vc) ([Live Demo](https://orangecollective.vc/unicorn-ratio)).

## Important Disclaimer

This tool is for **educational and research purposes only**. It provides a mathematical framework for thinking about portfolio construction but should not be used as the sole basis for investment decisions.

- This is not investment advice
- Past performance does not predict future results
- The model makes many simplifying assumptions
- Real-world investing involves many factors not captured here
- Always do your own research and due diligence

## Overview

The Unicorn Ratio helps investors determine the optimal number of startups to invest in for a given cohort. It provides two different approaches:

1. **Kelly Criterion**: Optimize portfolio size and check amounts based on probability of success and potential returns
2. **Binomial Distribution**: Analyze how portfolio size affects probability of finding unicorns

Built with:

- [Next.js v15](https://nextjs.org)
- [Shadcn UI](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [KaTeX](https://katex.org)

## Project Structure

```
unicorn-ratio/
├── app/
│   ├── layout.tsx       # Root layout with providers
│   └── page.tsx         # Main page component
├── components/
│   ├── Assumptions.tsx      # Assumptions input form
│   ├── BinomialProbability.tsx  # Binomial distribution analysis
│   ├── Explanation.tsx      # Mathematical explanation
│   ├── KellyCriterion.tsx   # Kelly criterion analysis
│   ├── ModelInputs.tsx      # Model selection and inputs
│   ├── ProbabilityChart.tsx # Probability visualization
│   └── ui/                  # Shadcn UI components
├── lib/
│   ├── binomialModel.ts  # Binomial probability calculations
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Helper functions
└── public/
    └── images/         # Static images and icons
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/orangecollective/unicorn-ratio.git

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Model Limitations

The mathematical models used in this tool have several important limitations:

1. **Simplified Assumptions**: The models assume:

   - Binary outcomes (unicorn or not)
   - Fixed probabilities of success
   - Independent outcomes between investments
   - Perfect capital allocation

2. **Historical Data**: Past unicorn rates may not predict future outcomes

3. **Skill Assessment**: The models rely on accurate self-assessment of investment skill

4. **Market Dynamics**: Does not account for:

   - Market cycles
   - Sector-specific trends
   - Competition for deals
   - Follow-on investments

5. **Portfolio Management**: Excludes considerations like:
   - Portfolio diversification
   - Investment staging
   - Pro-rata rights
   - Reserve capital

## About Orange Collective

Orange Collective is a venture fund led by an independent group of Y Combinator alumni. We are not affiliated, associated, authorized, endorsed by, or officially connected with Y Combinator.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Kelly Criterion](https://www.investopedia.com/articles/trading/04/091504.asp)
- [Binomial Distribution](https://www.investopedia.com/terms/b/binomialdistribution.asp)

## Deploy

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open-sourced under the MIT License.

```
MIT License

Copyright (c) 2024 Orange Collective

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
