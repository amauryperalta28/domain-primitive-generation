using Optional;
using Triplex.Validations;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents CitizenWithOneOptionalProperty entity.
/// </summary>
public sealed class CitizenWithOneOptionalProperty 
{
	/// <summary>
	/// Represents CitizenWithOneOptionalProperty's Id
	/// </summary>
	public Option<Id> Id { get; }

	private CitizenWithOneOptionalProperty(Builder builder)
	{
		Arguments.NotNull(builder, nameof(builder));
		Id = builder.IdOption;
	}

	/// TODO: Remember to write tests for businnes logic
	/// TODO: and then if code coverage decreases comment or delete the code not used

	/// <summary>
	/// CitizenWithOneOptionalProperty's builder.
	/// </summary>
	public sealed class Builder : AbstractEntityBuilder<CitizenWithOneOptionalProperty>
	{
		protected override Option<string> AlreadyBuiltErrorMessage => Option.None<string>();
		protected override Option<string> MustBeBuiltErrorMessage => Option.None<string>();
		internal Option<Id> IdOption { get; private set; }

		private new Builder SetProperty(Action setter) => (Builder)base.SetProperty(setter);

		protected override CitizenWithOneOptionalProperty DoBuild()
		{

			return new CitizenWithOneOptionalProperty(this);
		}

		public Builder WithId(Id id)
		    => SetProperty(() => IdOption = Arguments.NotNull(id, nameof(id).SomeNotNull()));

	}
}
