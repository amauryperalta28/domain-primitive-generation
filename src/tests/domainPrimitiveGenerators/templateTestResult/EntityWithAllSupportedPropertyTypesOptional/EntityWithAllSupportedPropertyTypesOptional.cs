using Optional;
using Triplex.Validations;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents EntityWithAllSupportedPropertyTypesOptional entity.
/// </summary>
public sealed class EntityWithAllSupportedPropertyTypesOptional 
{
	/// <summary>
	/// Represents EntityWithAllSupportedPropertyTypesOptional's Id
	/// </summary>
	public Option<Id> Id { get; }

	/// <summary>
	/// Represents EntityWithAllSupportedPropertyTypesOptional's Names
	/// </summary>
	public Option<Names> Names { get; }

	/// <summary>
	/// Represents EntityWithAllSupportedPropertyTypesOptional's Salary
	/// </summary>
	public Option<Salary> Salary { get; }

	/// <summary>
	/// Represents EntityWithAllSupportedPropertyTypesOptional's Age
	/// </summary>
	public Option<Age> Age { get; }

	/// <summary>
	/// Represents EntityWithAllSupportedPropertyTypesOptional's Birthday
	/// </summary>
	public Option<Birthday> Birthday { get; }

	private EntityWithAllSupportedPropertyTypesOptional(Builder builder)
	{
		Arguments.NotNull(builder, nameof(builder));
		Id = builder.IdOption;
		Names = builder.NamesOption;
		Salary = builder.SalaryOption;
		Age = builder.AgeOption;
		Birthday = builder.BirthdayOption;
	}

	/// TODO: Remember to write tests for businnes logic
	/// TODO: and then if code coverage decreases comment or delete the code not used

	/// <summary>
	/// EntityWithAllSupportedPropertyTypesOptional's builder.
	/// </summary>
	public sealed class Builder : AbstractEntityBuilder<EntityWithAllSupportedPropertyTypesOptional>
	{
		protected override Option<string> AlreadyBuiltErrorMessage => Option.None<string>();
		protected override Option<string> MustBeBuiltErrorMessage => Option.None<string>();
		internal Option<Id> IdOption { get; private set; }

		internal Option<Names> NamesOption { get; private set; }

		internal Option<Salary> SalaryOption { get; private set; }

		internal Option<Age> AgeOption { get; private set; }

		internal Option<Birthday> BirthdayOption { get; private set; }

		private new Builder SetProperty(Action setter) => (Builder)base.SetProperty(setter);

		protected override EntityWithAllSupportedPropertyTypesOptional DoBuild()
		{
			State.IsTrue(IdOption.HasValue, "EntityWithAllSupportedPropertyTypesOptional's Id is missing");
			State.IsTrue(NamesOption.HasValue, "EntityWithAllSupportedPropertyTypesOptional's Names is missing");
			State.IsTrue(SalaryOption.HasValue, "EntityWithAllSupportedPropertyTypesOptional's Salary is missing");
			State.IsTrue(AgeOption.HasValue, "EntityWithAllSupportedPropertyTypesOptional's Age is missing");
			State.IsTrue(BirthdayOption.HasValue, "EntityWithAllSupportedPropertyTypesOptional's Birthday is missing");

			return new EntityWithAllSupportedPropertyTypesOptional(this);
		}

		public Builder WithId(Id id)
		    => SetProperty(() => IdOption = Arguments.NotNull(id, nameof(id).SomeNotNull()));

		public Builder WithNames(Names names)
		    => SetProperty(() => NamesOption = Arguments.NotNull(names, nameof(names).SomeNotNull()));

		public Builder WithSalary(Salary salary)
		    => SetProperty(() => SalaryOption = Arguments.NotNull(salary, nameof(salary).SomeNotNull()));

		public Builder WithAge(Age age)
		    => SetProperty(() => AgeOption = Arguments.NotNull(age, nameof(age).SomeNotNull()));

		public Builder WithBirthday(Birthday birthday)
		    => SetProperty(() => BirthdayOption = Arguments.NotNull(birthday, nameof(birthday).SomeNotNull()));

	}
}