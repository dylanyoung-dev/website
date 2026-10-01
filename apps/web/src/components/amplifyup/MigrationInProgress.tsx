/**
 * Shown for any route without a published AmplifyUP view while the site
 * migrates to the catch-all. Remove in phase 3 (see the migration plan).
 */
export function MigrationInProgress() {
  return (
    <div className="container mx-auto flex max-w-2xl flex-col items-center justify-center space-y-4 px-4 py-24 text-center md:py-32">
      <h1 className="text-3xl font-bold md:text-4xl">
        Migration to AmplifyUP in progress
      </h1>
      <p className="text-lg text-muted-foreground">
        This page is being rebuilt. Please check back shortly.
      </p>
    </div>
  );
}
