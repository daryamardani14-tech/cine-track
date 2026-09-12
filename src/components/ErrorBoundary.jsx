import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App crashed:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950 text-white">
          <p className="text-lg font-medium">Failed to load</p>
          <button
            onClick={this.handleReload}
            className="rounded-xl border-2 border-red-500/60 bg-neutral-900 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/10">
            Return to page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
