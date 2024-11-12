![UnicornRatioByOrangeCollective](https://github.com/user-attachments/assets/e79d3145-fe09-40f6-b595-c7efc2218565)

# The Unicorn Ratio
A framework for optimizing startup portfolio construction when investing in cohorts, using the Kelly Criterion and Binomial Distribution. Built by [Orange Collective](https://orangecollective.vc) ([Live Demo](https://orangecollective.vc/unicorn-ratio)).

## Important Disclaimer

This tool is for **educational and research purposes only**. It provides a mathematical framework for thinking about portfolio construction but should not be used as the sole basis for investment decisions.

- This is not investment advice
- Past performance does not predict future results
- The model makes many simplifying assumptions
- Real-world investing involves many factors not captured here
- Always do your own research and due diligence

## Overview

The Unicorn Ratio helps investors determine the optimal number of startups to invest in for a given cohort. It provides two different approaches:

1. **[Kelly Criterion](https://www.investopedia.com/articles/trading/04/091504.asp)**: Optimize portfolio size and check amounts based on probability of success and potential returns
2. **[Binomial Distribution](https://www.investopedia.com/terms/b/binomialdistribution.asp)**: Analyze how portfolio size affects probability of finding unicorns

Built with:

- [Next.js v15](https://nextjs.org)
- [Shadcn UI](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [KaTeX](https://katex.org)

## Key Assumptions

- **Binary Outcomes**: Each investment either becomes a unicorn or does not.
- **Fixed Success Probability**: Assumes a stable probability of a startup becoming a unicorn.
- **Independent Investments**: Each investment’s outcome is independent of others.
- **Perfect Capital Allocation**: Assumes that capital can be allocated optimally across investments.

## Inputs

1. **Unicorn Rate**: The estimated probability of any given startup in the cohort becoming a unicorn.
2. **Number of Companies**: The total number of startups in the cohort available for investment.
3. **Fund Allocation**: The amount of capital available to invest in the cohort.

These inputs are used to calculate the optimal portfolio size and check amount per investment based on the selected model.

## Mathematical Models

### 1. Kelly Criterion

The **Kelly Criterion** is a formula that determines the proportion of capital to allocate to each investment based on the probability of success (i.e. historical unicorn rate).

**Formula**: 

<img width="156" alt="image" src="https://github.com/user-attachments/assets/1dbed420-1782-42f5-a36e-2de22a93505b">

where:
- \( f \) = fraction of capital to allocate to each investment
- \( p \) = probability of success (unicorn rate)
- \( b \) = odds multiplier (e.g., the return multiple if the startup becomes a unicorn)

### 2. Binomial Distribution

The **Binomial Distribution** model analyzes the probability of achieving a desired number of unicorns (e.g., 1 unicorn) given a set number of investments and a fixed probability of success. 

**Formula**:

For a binomial distribution, the probability of picking at least 1 unicorn is:

<img width="348" alt="image" src="https://github.com/user-attachments/assets/9472867a-d957-4326-8a19-6d5046f904e8">

where:
- \( n \) = number of investments
- \( k \) = desired number of unicorns
- \( p \) = probability of each startup becoming a unicorn

## Using the App

1. **Set Assumptions**: Enter the unicorn rate, available capital, and choose the desired model (Kelly Criterion or Binomial Distribution).
2. **Interpret Outputs**:
   - **Kelly Criterion** will suggest a specific check size per startup based on the probability of success.
   - **Binomial Distribution** will display a probability curve illustrating the likelihood of achieving a target number of unicorns as the portfolio size varies.
3. **Optimize Strategy**: Use the results to make informed decisions about how many startups to invest in and at what check size to maximize potential unicorn outcomes in a capital-efficient way.

## Model Limitations

The mathematical models used in this tool have several important limitations:

1. **Simplified Assumptions**: The models assume:
   - Binary outcomes (unicorn or not).
   - Fixed probabilities of success.
   - Independent outcomes between investments.
   - Perfect capital allocation.

2. **Historical Data**: Past unicorn rates may not predict future outcomes.

3. **Skill Assessment**: The models rely on an accurate self-assessment of the probability of success. Applying a higher skill level effectively reduces the cohort size.

4. **Market Dynamics**: The models do not account for:
   - Market cycles.
   - Sector-specific trends.
   - Competition for deals.
   - Follow-on investments.

5. **Portfolio Management**: Excludes factors such as:
   - Portfolio diversification.
   - Investment staging.
   - Pro-rata rights.
   - Reserve capital.

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

Open [http://localhost:3000](http://localhost:3000) with your browser.

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
